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
    image: require("../../../../../assets/Images/store_norte.jpg"),
    title: "Compre com",
    subtitle: "confiança.",
    description:
      "Avalie lojas, compare preços e receba tudo com total segurança.",
  },
  {
    id: "3",
    image: require("../../../../../assets/Images/store_sul.jpg"),
    title: "Entrega rápida",
    subtitle: "no seu ritmo.",
    description:
      "Acompanhe seu pedido em tempo real, do carrinho até a sua porta.",
  },
];

export default SLIDES;
