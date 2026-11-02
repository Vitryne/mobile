import type { ImageSourcePropType } from "react-native";

export interface HomeCategory {
  id: string;
  label: string;
  image: ImageSourcePropType;
}

export interface HomeBanner {
  id: string;
  tag: string;
  title: string;
  cta: string;
  image: ImageSourcePropType;
}

export interface HomeStore {
  id: string;
  name: string;
  tag?: string;
  distance: string;
  rating: string;
  image: ImageSourcePropType;
}

export interface HomeProduct {
  id: string;
  name: string;
  store: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  favorite: boolean;
  image: ImageSourcePropType;
}

export const DELIVERY_ADDRESS = "Zona 7, Maringá";
export const OPEN_ORDERS_COUNT = 2;

export const CATEGORIES: HomeCategory[] = [
  {
    id: "all",
    label: "Todos",
    image: require("../../../../../assets/Images/store_norte.jpg"),
  },
  {
    id: "dresses",
    label: "Vestidos",
    image: require("../../../../../assets/Images/cat_vestidos.jpg"),
  },
  {
    id: "shirts",
    label: "Camisas",
    image: require("../../../../../assets/Images/cat_camisas.jpg"),
  },
  {
    id: "pants",
    label: "Calças",
    image: require("../../../../../assets/Images/cat_calcas.jpg"),
  },
  {
    id: "hoodies",
    label: "Moletons",
    image: require("../../../../../assets/Images/cat_moletons.jpg"),
  },
];

export const BANNERS: HomeBanner[] = [
  {
    id: "autumn",
    tag: "COLEÇÃO OUTONO",
    title: "Cores que\naquecem.",
    cta: "Explorar",
    image: require("../../../../../assets/Images/hero_1.jpg"),
  },
  {
    id: "new",
    tag: "NOVIDADES",
    title: "Chegou o\ninverno.",
    cta: "Ver agora",
    image: require("../../../../../assets/Images/hero_2.jpg"),
  },
  {
    id: "sale",
    tag: "PROMOÇÃO",
    title: "Até 30% OFF\nem casacos.",
    cta: "Aproveitar",
    image: require("../../../../../assets/Images/hero_3.jpg"),
  },
];

export const STORES: HomeStore[] = [
  {
    id: "atelier-norte",
    name: "Atelier Norte",
    tag: "FRETE GRÁTIS",
    distance: "1.2 km",
    rating: "4.8",
    image: require("../../../../../assets/Images/store_norte.jpg"),
  },
  {
    id: "dig-for-fashion",
    name: "Dig for Fashion",
    tag: "20% OFF",
    distance: "0.8 km",
    rating: "4.4",
    image: require("../../../../../assets/Images/store_atelier.jpg"),
  },
  {
    id: "casa-aurora",
    name: "Casa Aurora",
    distance: "2.1 km",
    rating: "4.6",
    image: require("../../../../../assets/Images/store_sul.jpg"),
  },
];

export const PRODUCTS: HomeProduct[] = [
  {
    id: "p1",
    name: "Vestido midi seda",
    store: "Atelier Norte",
    price: 289.9,
    oldPrice: 349,
    discount: 18,
    favorite: false,
    image: require("../../../../../assets/Images/p_vestido_seda.jpg"),
  },
  {
    id: "p2",
    name: "Blazer oversize",
    store: "Dig for Fashion",
    price: 459,
    favorite: true,
    image: require("../../../../../assets/Images/p_blazer_oversize.jpg"),
  },
  {
    id: "p3",
    name: "Camisa de linho",
    store: "Casa Mira",
    price: 219,
    favorite: false,
    image: require("../../../../../assets/Images/p_camisa_linho.jpg"),
  },
  {
    id: "p4",
    name: "Saia plissada midi",
    store: "Atelier Norte",
    price: 179,
    favorite: false,
    image: require("../../../../../assets/Images/p_saia_plissada.jpg"),
  },
  {
    id: "p5",
    name: "Tênis de corrida Nike",
    store: "Studio Vento",
    price: 549,
    favorite: false,
    image: require("../../../../../assets/Images/cat_tenis.jpg"),
  },
  {
    id: "p6",
    name: "Jaqueta de couro biker",
    store: "Linha do Sul",
    price: 489,
    favorite: false,
    image: require("../../../../../assets/Images/p_jaqueta_couro.jpg"),
  },
];
