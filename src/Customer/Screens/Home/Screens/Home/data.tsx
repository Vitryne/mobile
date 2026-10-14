import { ImageSourcePropType } from "react-native";

// Todo `image` é opcional: enquanto estiver vazio a tela mostra um bloco
// colorido no lugar da foto, então nada quebra por falta de arquivo.
// Quando tiver as imagens, é só preencher assim:
//   image: require("../../../../../assets/Images/home/vestidos.png"),
// (conte os "../" até a raiz, igual fizemos no starterData)

export interface HomeCategory {
  id: string;
  label: string;
  image?: ImageSourcePropType;
}

export interface HomeBanner {
  id: string;
  tag: string;
  title: string; // "\n" quebra a linha, igual ao protótipo
  cta: string;
  image?: ImageSourcePropType;
}

export interface HomeStore {
  id: string;
  name: string;
  tag?: string;
  distance: string;
  rating: string;
  image?: ImageSourcePropType;
}

export interface HomeProduct {
  id: string;
  name: string;
  store: string;
  price: number;
  oldPrice?: number;
  discount?: number; // em %, aparece como "-18%"
  favorite: boolean;
  image?: ImageSourcePropType;
}

// Troque pelos dados reais (endereço salvo do usuário, pedidos em aberto...)
export const DELIVERY_Address = "Zona 7, Maringá";
export const OPEN_ORDERS_COUNT = 2;

export const CATEGORIES: HomeCategory[] = [
  { id: "all", label: "Todos" },
  { id: "dresses", label: "Vestidos" },
  { id: "shirts", label: "Camisas" },
  { id: "pants", label: "Calças" },
  { id: "hoodies", label: "Moletons" },
];

export const BANNERS: HomeBanner[] = [
  {
    id: "autumn",
    tag: "COLEÇÃO OUTONO",
    title: "Cores que\naquecem.",
    cta: "Explorar",
  },
  {
    id: "new",
    tag: "NOVIDADES",
    title: "Chegou o\ninverno.",
    cta: "Ver agora",
  },
  {
    id: "sale",
    tag: "PROMOÇÃO",
    title: "Até 30% OFF\nem casacos.",
    cta: "Aproveitar",
  },
];

export const STORES: HomeStore[] = [
  {
    id: "atelier-norte",
    name: "Atelier Norte",
    tag: "FRETE GRÁTIS",
    distance: "1.2 km",
    rating: "4.8",
  },
  {
    id: "dig-for-fashion",
    name: "Dig for Fashion",
    tag: "20% OFF",
    distance: "0.8 km",
    rating: "4.4",
  },
  {
    id: "casa-aurora",
    name: "Casa Aurora",
    distance: "2.1 km",
    rating: "4.6",
  },
];

export const PRODUCTS: HomeProduct[] = [
  {
    id: "p1",
    name: "Casaco de lã bordô",
    store: "Atelier Norte",
    price: 289.9,
    oldPrice: 353.5,
    discount: 18,
    favorite: false,
  },
  {
    id: "p2",
    name: "Blusa de tricô rosé",
    store: "Dig for Fashion",
    price: 159.9,
    favorite: true,
  },
  {
    id: "p3",
    name: "Calça de alfaiataria",
    store: "Casa Aurora",
    price: 219.9,
    favorite: false,
  },
  {
    id: "p4",
    name: "Moletom oversized",
    store: "Atelier Norte",
    price: 179.9,
    oldPrice: 199.9,
    discount: 10,
    favorite: false,
  },
];
