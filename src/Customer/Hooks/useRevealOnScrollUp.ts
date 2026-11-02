import { useCallback, useMemo, useRef } from "react";
import {
    Animated,
    Easing,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
} from "react-native";

const USE_NATIVE_DRIVER = Platform.OS !== "web";

export const SEARCH_AREA_HEIGHT = 62;

const DIRECTION_THRESHOLD = 12;

type ScrollTracker = {
  lastY: number;
  direction: -1 | 0 | 1;
  travelled: number;
  shown: boolean;
};

type TrackerAction = "show" | "hide" | "reset" | null;

export function trackScroll(
  tracker: ScrollTracker,
  y: number,
  hideZone: number,
): TrackerAction {
  if (y <= 0) {
    const wasShown = tracker.shown;
    tracker.lastY = 0;
    tracker.direction = 0;
    tracker.travelled = 0;
    tracker.shown = false;
    return wasShown ? "reset" : null;
  }

  const delta = y - tracker.lastY;
  tracker.lastY = y;
  if (delta === 0) return null;

  const direction = delta > 0 ? 1 : -1;
  if (direction !== tracker.direction) {
    tracker.direction = direction;
    tracker.travelled = 0;
  }

  tracker.travelled += Math.abs(delta);
  if (tracker.travelled < DIRECTION_THRESHOLD) return null;

  if (direction < 0 && !tracker.shown && y > hideZone) {
    tracker.shown = true;
    return "show";
  }

  if (direction > 0 && tracker.shown) {
    tracker.shown = false;
    return "hide";
  }

  return null;
}

export function useRevealOnScrollUp(areaHeight: number = SEARCH_AREA_HEIGHT) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const reveal = useRef(new Animated.Value(0)).current;
  const tracker = useRef<ScrollTracker>({
    lastY: 0,
    direction: 0,
    travelled: 0,
    shown: false,
  }).current;

  const translateY = useMemo(() => {
    const followContent = scrollY.interpolate({
      inputRange: [0, areaHeight],
      outputRange: [0, -areaHeight],
      extrapolate: "clamp",
    });
    const hiddenFactor = reveal.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return Animated.multiply(followContent, hiddenFactor);
  }, [scrollY, reveal, areaHeight]);

  const animateReveal = useCallback(
    (toValue: 0 | 1) => {
      Animated.timing(reveal, {
        toValue,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
    },
    [reveal],
  );

  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: USE_NATIVE_DRIVER,
        listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const action = trackScroll(
            tracker,
            event.nativeEvent.contentOffset.y,
            areaHeight,
          );

          if (action === "show") animateReveal(1);
          else if (action === "hide") animateReveal(0);
          else if (action === "reset") reveal.setValue(0);
        },
      }),
    [scrollY, reveal, tracker, animateReveal, areaHeight],
  );

  return { onScroll, translateY };
}
