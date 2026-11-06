import type { Order } from "../../../Types/orders";

export const ACTIVE_ORDERS: Order[] = [
  {
    id: "3194",
    protocol: "#A-3194",
    store: "Atelier Norte",
    date: "Hoje",
    productName: "Vestido midi seda",
    itemCount: 3,
    total: 566.2,
    status: "pending",
    estimatedTime: "12-18 MIN",
    image: require("../../../../../assets/Images/p_vestido_seda.jpg"),
    products: [
      {
        id: "p1",
        name: "Vestido midi seda",
        image: require("../../../../../assets/Images/p_vestido_seda.jpg"),
      },
      {
        id: "p2",
        name: "Saia plissada midi",
        image: require("../../../../../assets/Images/p_saia_plissada.jpg"),
      },
      {
        id: "p3",
        name: "Bolsa",
        image: require("../../../../../assets/Images/cat_acessorios.jpg"),
      },
    ],
  },
  {
    id: "3195",
    protocol: "#A-3195",
    store: "Dig for Fashion",
    date: "Hoje",
    productName: "Blazer oversize",
    itemCount: 2,
    total: 638,
    status: "preparing",
    estimatedTime: "20-30 MIN",
    image: require("../../../../../assets/Images/p_blazer_oversize.jpg"),
    products: [
      {
        id: "p4",
        name: "Blazer oversize",
        image: require("../../../../../assets/Images/p_blazer_oversize.jpg"),
      },
      {
        id: "p5",
        name: "Saia plissada midi",
        image: require("../../../../../assets/Images/p_saia_plissada.jpg"),
      },
    ],
  },
];

export const ORDER_HISTORY: Order[] = [
  {
    id: "3193",
    protocol: "#A-3193",
    store: "Casa Mira",
    date: "12 set",
    productName: "Camisa Linho, Gravata",
    itemCount: 2,
    total: 512,
    status: "delivered",
    image: require("../../../../../assets/Images/p_camisa_linho.jpg"),
    products: [
      {
        id: "p6",
        name: "Camisa de linho",
        image: require("../../../../../assets/Images/p_camisa_linho.jpg"),
      },
    ],
  },
  {
    id: "3192",
    protocol: "#A-3192",
    store: "Studio Vento",
    date: "03 ago",
    productName: "Tênis de corrida Nike",
    itemCount: 1,
    total: 549,
    status: "canceled",
    image: require("../../../../../assets/Images/cat_tenis.jpg"),
    products: [
      {
        id: "p7",
        name: "Tênis de corrida Nike",
        image: require("../../../../../assets/Images/cat_tenis.jpg"),
      },
    ],
  },
  {
    id: "3191",
    protocol: "#A-3191",
    store: "Dig for Fashion",
    date: "27 jun",
    productName: "Moletom oversized",
    itemCount: 1,
    total: 120.99,
    status: "delivered",
    image: require("../../../../../assets/Images/cat_moletons.jpg"),
    products: [
      {
        id: "p8",
        name: "Moletom oversized",
        image: require("../../../../../assets/Images/cat_moletons.jpg"),
      },
    ],
  },
  {
    id: "3190",
    protocol: "#A-3190",
    store: "Atelier Norte",
    date: "10 jun",
    productName: "Vestido midi seda",
    itemCount: 1,
    total: 289.9,
    status: "delivered",
    image: require("../../../../../assets/Images/p_vestido_seda.jpg"),
    products: [
      {
        id: "p9",
        name: "Vestido midi seda",
        image: require("../../../../../assets/Images/p_vestido_seda.jpg"),
      },
    ],
  },
];
