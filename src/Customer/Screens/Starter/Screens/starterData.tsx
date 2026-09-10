import { ImageSourcePropType } from "react-native";

export interface OnboardingSlide {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  description: string;
}

// Cada item representa um slide do onboarding.
// Troque as imagens pelos arquivos reais dentro de ../assets
const SLIDES: OnboardingSlide[] = [
  {
    id: "1",
    image: require("../../../../../assets/Images/onboarding.png"),
    title: "Lojas locais.",
    subtitle: "Estilo entregue.",
    description:
      "Descubra lojas de moda perto de você, peça pelo app e receba em casa — no mesmo dia.",
  },
  //   {
  //     id: "2",
  //     image: require("../assets/onboarding-fashion-2.jpg"),
  //     title: "Compre com",
  //     subtitle: "confiança.",
  //     description:
  //       "Avalie lojas, compare preços e receba tudo com total segurança.",
  //   },
  //   {
  //     id: "3",
  //     image: require("../assets/onboarding-fashion-3.jpg"),
  //     title: "Entrega rápida",
  //     subtitle: "no seu ritmo.",
  //     description:
  //       "Acompanhe seu pedido em tempo real, do carrinho até a sua porta.",
  //   },
];

export default SLIDES;
