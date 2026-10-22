import type { CartStore } from "@/Customer/Hooks/useCart";

export const mockStores: CartStore[] = [
  {
    id: "1",
    name: "Atelier Norte",
    logo: require("../../../../assets/Images/detail_4.jpg"),
    deliveryTime: "45-60 min",
    deliveryFee: 9.9,
    items: [
      {
        id: "1",
        name: "Vestido midi seda",
        size: "M",
        price: 289,
        quantity: 1,
        image: require("../../../../assets/Images/detail_1.jpg"),
      },
      {
        id: "2",
        name: "Saia plissada midi",
        size: "P",
        price: 179,
        quantity: 1,
        image: require("../../../../assets/Images/detail_2.jpg"),
      },
    ],
  },
  {
    id: "2",
    name: "Casa Mira",
    logo: require("../../../../assets/Images/detail_2.jpg"),
    deliveryTime: "45-60 min",
    deliveryFee: 9.9,
    items: [
      {
        id: "3",
        name: "Camisa de linho oversized",
        size: "G",
        price: 219,
        quantity: 1,
        image: require("../../../../assets/Images/detail_3.jpg"),
      },
    ],
  },
];
