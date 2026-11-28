import { spacing } from "@/Shared/Styles/commonStyles";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WEB_MIN_TOP_INSET = spacing.lg;

export function useTopInset() {
  const insets = useSafeAreaInsets();

  const safeTop =
    Platform.OS === "web"
      ? Math.max(insets.top, WEB_MIN_TOP_INSET)
      : insets.top;

  return safeTop + spacing.sm;
}
