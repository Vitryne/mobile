import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    LayoutChangeEvent,
    ListRenderItemInfo,
    Text,
    useWindowDimensions,
    View,
    ViewToken,
} from "react-native";
import { PrimaryButton } from "../../../Components/PrimaryButton";
import { SecundaryButton } from "../../../Components/SecundaryButton";

import { CustomerStackParamList } from "../../../Types/navigation";
import SLIDES, { starterData } from "../Data/data";
import { styles } from "./styles";

type Props = NativeStackScreenProps<CustomerStackParamList, "Starter">;

const AUTO_PLAY_INTERVAL_MS = 3000;

export function Starter({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<starterData>>(null);

  const [listHeight, setListHeight] = useState(0);

  const handleListLayout = useCallback((event: LayoutChangeEvent) => {
    setListHeight(event.nativeEvent.layout.height);
  }, []);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 60,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setActiveIndex(viewableItems[0].index as number);
      }
    },
  ).current;

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % SLIDES.length;
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, AUTO_PLAY_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const renderSlide = useCallback(
    ({ item }: ListRenderItemInfo<starterData>) => (
      <View style={[styles.slide, { width, height: listHeight }]}>
        <View style={styles.image_container}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.55)", "#FFFFFF"]}
            style={styles.gradient}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title_highlight}>{item.subtitle}</Text>
          <Text style={styles.subtitle}>{item.description}</Text>
        </View>
      </View>
    ),
    [width, listHeight, activeIndex],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        getItemLayout={getItemLayout}
        style={styles.list}
        onLayout={handleListLayout}
      />
      <View style={styles.dots_row}>
        {SLIDES.map((slide, index) => (
          <View
            key={slide.id}
            style={[styles.dot, index === activeIndex && styles.dot_active]}
          />
        ))}
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          label="Criar Conta"
          onPress={() => navigation.navigate("RegisterPersonalData")}
        />
        <SecundaryButton
          label="Já tenho uma conta"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}
