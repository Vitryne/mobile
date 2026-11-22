import type { ImageSourcePropType } from "react-native";
import type { CatalogCategoryId, CatalogFilterId } from "../../../Data/catalog";

export interface CategoryFilter {
  id: CatalogFilterId;
  label: string;
}

export interface CategoryEntry {
  id: CatalogCategoryId;
  name: string;
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
    image: require("../../../../../assets/Images/cat_vestidos.jpg"),
  },
  {
    id: "skirts",
    name: "Saias",
    image: require("../../../../../assets/Images/cat_saias.jpg"),
  },
  {
    id: "pants",
    name: "Calças",
    image: require("../../../../../assets/Images/cat_calcas.jpg"),
  },
  {
    id: "shirts",
    name: "Camisetas",
    image: require("../../../../../assets/Images/cat_camisas.jpg"),
  },
  {
    id: "hoodies",
    name: "Moletons",
    image: require("../../../../../assets/Images/cat_moletons.jpg"),
  },
  {
    id: "sneakers",
    name: "Tênis",
    image: require("../../../../../assets/Images/cat_tenis.jpg"),
  },
  {
    id: "accessories",
    name: "Acessórios",
    image: require("../../../../../assets/Images/cat_acessorios.jpg"),
  },
  {
    id: "jackets",
    name: "Jaquetas",
    image: require("../../../../../assets/Images/cat_jaquetas.jpg"),
  },
];

export const TREND_BANNER = {
  title: "Tendência inverno",
  subtitle: "Tecidos quentes em tons terrosos",
  cta: "Explorar",
};
