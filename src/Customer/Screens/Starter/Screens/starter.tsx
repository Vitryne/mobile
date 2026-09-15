import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useRef, useState } from "react";
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
import SLIDES, { starterData } from "./starterData";
import { styles } from "./styles";

type Props = NativeStackScreenProps<CustomerStackParamList, "Starter">;

export function Starter({ navigation }: Props) {
  const { width } = useWindowDimensions(); // largura da tela, usada pro paging do FlatList
  const [activeIndex, setActiveIndex] = useState(0);
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

  const renderSlide = useCallback(
    ({ item }: ListRenderItemInfo<starterData>) => (
      <View style={[styles.slide, { width, height: listHeight }]}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.55)", "#FFFFFF"]}
            style={styles.gradient}
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.titleHighlight}>{item.subtitle}</Text>
          <Text style={styles.subtitle}>{item.description}</Text>

          <View style={styles.dotsRow}>
            {SLIDES.map((slide, index) => (
              <View
                key={slide.id}
                style={[styles.dot, index === activeIndex && styles.dotActive]}
              />
            ))}
          </View>
        </View>
      </View>
    ),
    [width, listHeight, activeIndex],
  );

  return (
    <View style={styles.container}>
      {/* Tudo o que fica ACIMA do footer é esta FlatList, com scroll horizontal */}
      <FlatList
        data={SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        style={styles.list}
        onLayout={handleListLayout}
      />

      {/* Footer: os dois botões, fixo embaixo, fora da FlatList */}
      <View style={styles.footer}>
        <PrimaryButton
          label="Criar Conta"
          onPress={() => navigation.navigate("MenuCarrinho")}
        />
        <SecundaryButton
          label="Já tenho uma conta"
          onPress={() => navigation.navigate("MenuCarrinho")}
        />
      </View>
    </View>
  );
}
