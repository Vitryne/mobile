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
import SLIDES, { starterData } from "./starterData";
import { styles } from "./styles";

type Props = NativeStackScreenProps<CustomerStackParamList, "Starter">;

const AUTO_PLAY_INTERVAL_MS = 3000;

export function Starter({ navigation }: Props) {
  const { width } = useWindowDimensions(); // largura da tela, usada pro paging do FlatList
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList<starterData>>(null);

  // Altura real do FlatList, medida via onLayout. "height: '100%'" não
  // resolve de forma confiável dentro do conteúdo de uma lista horizontal,
  // então precisamos de um número real em vez de porcentagem.
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

  // Necessário pro scrollToIndex saber a posição de cada item sem precisar
  // renderizá-los antes (todos têm a mesma largura: a da tela).
  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width],
  );

  // Auto-play: a cada 3s avança pro próximo slide, voltando pro primeiro
  // depois do último. O efeito reinicia sempre que "activeIndex" muda -
  // seja pelo próprio timer, seja por um swipe manual do usuário - então o
  // contador sempre reseta quando algo muda a página.
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % SLIDES.length;
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, AUTO_PLAY_INTERVAL_MS);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Cada item da FlatList é a "página" inteira: foto + título + subtítulo +
  // descrição + dots. Os dots ficam dentro do próprio item (não como uma
  // lista separada), porque tudo acima do footer precisa ser exclusivamente
  // essa FlatList horizontal.
  const renderSlide = useCallback(
    ({ item }: ListRenderItemInfo<starterData>) => (
      <View style={[styles.slide, { width, height: listHeight }]}>
        <View style={styles.image_container}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
          {/* Único uso de position: absolute deste arquivo - é uma camada
              de sobreposição visual (o esmaecimento por cima da foto),
              o mesmo truque que o próprio ImageBackground faz por baixo
              dos panos. Não é usado para posicionar/estruturar layout. */}
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
      {/* Tudo o que fica ACIMA do footer é esta FlatList, com scroll horizontal */}
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
      {/* Footer: os dois botões, fixo embaixo, fora da FlatList */}
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
