import type { ImageSourcePropType } from "react-native";

export interface CategoryFilter {
  id: string;
  label: string;
}

export interface CategoryEntry {
  id: string;
  name: string;
  count: number;
  image: ImageSourcePropType;
}

export const FILTERS: CategoryFilter[] = [
  {
    id: "women",
    label: "Feminino",
  },
  {
    id: "men",
    label: "Masculino",
  },
  {
    id: "kids",
    label: "Infantil",
  },
  {
    id: "new",
    label: "Novidades",
  },
  {
    id: "shoes",
    label: "Calçados",
  },
];

export const CATEGORIES: CategoryEntry[] = [
  {
    id: "dresses",
    name: "Vestidos",
    count: 412,
    image: require("../../../../../assets/Images/cat_vestidos.jpg"),
  },
  {
    id: "skirts",
    name: "Saias",
    count: 94,
    image: require("../../../../../assets/Images/cat_saias.jpg"),
  },
  {
    id: "pants",
    name: "Calças",
    count: 356,
    image: require("../../../../../assets/Images/cat_calcas.jpg"),
  },
  {
    id: "shirts",
    name: "Camisetas",
    count: 289,
    image: require("../../../../../assets/Images/cat_camisas.jpg"),
  },
  {
    id: "hoodies",
    name: "Moletons",
    count: 163,
    image: require("../../../../../assets/Images/cat_moletons.jpg"),
  },
  {
    id: "sneakers",
    name: "Tênis",
    count: 201,
    image: require("../../../../../assets/Images/cat_tenis.jpg"),
  },
  {
    id: "accessories",
    name: "Acessórios",
    count: 78,
    image: require("../../../../../assets/Images/cat_acessorios.jpg"),
  },
  {
    id: "jackets",
    name: "Jaquetas",
    count: 112,
    image: require("../../../../../assets/Images/cat_jaquetas.jpg"),
  },
];

export const TREND_BANNER = {
  title: "Tendência inverno",
  subtitle: "Tecidos quentes em tons terrosos",
  cta: "Explorar",
};
