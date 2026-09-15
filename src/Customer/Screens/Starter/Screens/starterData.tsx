import { ImageSourcePropType } from "react-native";

export interface starterData {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  description: string;
}

// A pasta deste arquivo é src/Customer/Screens/Starter/Screens/ - são 5
// níveis de "../" até a raiz do projeto (onde fica a pasta assets/).
const SLIDES: starterData[] = [
  {
    id: "1",
    image: require("../../../../../assets/Images/onboarding.png"),
    title: "Lojas locais.",
    subtitle: "Estilo entregue.",
    description:
      "Descubra lojas de moda perto de você, peça pelo app e receba em casa — no mesmo dia.",
  },
  {
    id: "2",
    image: require("../../../../../assets/Images/hero_2.jpg"),
    title: "Tamanho, cor,",
    subtitle: "preço - você filtra.",
    description:
      "Busque por categoria, tamanho ou faixa de preço. Vitryne mostra só o que serve em você.",
  },
  {
    id: "3",
    image: require("../../../../../assets/Images/hero_3.jpg"),
    title: "Pague no app.",
    subtitle: "Acompanhe ao vivo.",
    description:
      "PIX, cartão ou crédito parcelado. Acompanhe o entregador em tempo real até a porta.",
  },
];

export default SLIDES;
