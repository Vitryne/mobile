import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useRef, useState } from "react";
import {
    FlatList,
    ImageBackground,
    LayoutChangeEvent,
    ListRenderItemInfo,
    Text,
    useWindowDimensions,
    View,
    ViewToken,
} from "react-native";
// Caso não use Expo, troque a linha acima por:
// import LinearGradient from 'react-native-linear-gradient';
import { PrimaryButton } from "../../../Components/PrimaryButton";
import { SecundaryButton } from "../../../Components/SecundaryButton";

import { CustomerStackParamList } from "../../../Types/navigation";
import SLIDES, { OnboardingSlide } from "./starterData";
import { styles } from "./styles";

type Props = NativeStackScreenProps<CustomerStackParamList, "Starter">;

export function Starter({ navigation }: Props) {
  const { width } = useWindowDimensions(); // largura atual da tela (se adapta a rotação/tamanhos diferentes)
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [slideAreaHeight, setSlideAreaHeight] = useState<number>(0);

  const handleSlidesAreaLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    console.log("ALTURA MEDIDA DO SLIDES AREA:", height); // <-- temporário
    setSlideAreaHeight(height);
  }, []);
  // Necessário para o FlatList saber qual item está visível no momento
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
    ({ item }: ListRenderItemInfo<OnboardingSlide>) => (
      // A largura do slide precisa ser igual à da tela para o "pagingEnabled"
      // funcionar corretamente - isso é padrão de FlatList horizontal, não é gambiarra.
      <View style={{ width, height: slideAreaHeight }}>
        <View style={styles.imageContainer}>
          <ImageBackground
            source={item.image}
            style={styles.image}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.55)", "#FFFFFF"]}
              style={styles.gradient}
            />
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.titleHighlight}>{item.subtitle}</Text>
          <Text style={styles.subtitle}>{item.description}</Text>
        </View>
      </View>
    ),
    [width, slideAreaHeight],
  );

  const renderDot = ({ index }: ListRenderItemInfo<OnboardingSlide>) => (
    <View style={[styles.dot, index === activeIndex && styles.dotActive]} />
  );

  return (
    <View style={styles.container}>
      {/* Wrapper que só serve para medir a altura disponível para os slides */}
      <View style={styles.slidesArea} onLayout={handleSlidesAreaLayout}>
        {/* Só renderiza a lista depois que já sabemos a altura real,
            evitando o mesmo bug piscar na primeira renderização.
            IMPORTANTE: o FlatList horizontal precisa de uma altura EXPLÍCITA
            na própria style dele - ele não herda automaticamente a altura
            do conteúdo dos itens internos (pegadinha clássica do RN). */}
        {slideAreaHeight > 0 && (
          <FlatList
            data={SLIDES}
            keyExtractor={(item) => item.id}
            renderItem={renderSlide}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={onViewableItemsChanged}
            style={{ height: slideAreaHeight }}
          />
        )}
      </View>

      {/* Indicadores de página (dots) - irmã do slidesArea, não filha dele */}
      <FlatList
        data={SLIDES}
        horizontal
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={renderDot}
        contentContainerStyle={styles.dotsContainer}
      />

      <View style={styles.buttonsContainer}>
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
