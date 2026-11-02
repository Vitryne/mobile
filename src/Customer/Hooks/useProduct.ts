import type { ProductData } from "@/Customer/Types/product";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const PRODUCT_IMAGES = [
  require("../../../assets/Images/detail_1.jpg"),
  require("../../../assets/Images/detail_2.jpg"),
  require("../../../assets/Images/detail_3.jpg"),
];

// Mockado até a API de produto existir
const PRODUCT_MOCK: ProductData = {
  title: "Vestido midi seda fluida",
  reference: "Vestidos · Ref. VTR-VESTID",
  price: "R$ 289",
  priceCents: ",00",
  oldPrice: "R$ 349,00",
  discount: "-19% OFF",
  installments: "em até 6× R$ 48,17 sem juros · 5% no PIX",
  description:
    "Vestido midi em seda escovada com caimento fluido, alças finas reguláveis e fenda lateral discreta. 100% seda.",
  lowStockMessage: "Apenas 2 restantes no tamanho G",
  deliveryTitle: "Entrega hoje · 45-60 min",
  deliveryAddress: "Av. Brasil, 123 · Higienópolis, SP",
  deliveryFee: "R$ 9,90",
  store: {
    name: "Atelier Norte",
    initials: "AN",
    rating: "4.9",
    distance: "1.2 km",
    deliveryTime: "45-60 min",
    isOpen: true,
  },
  sizes: [
    { label: "PP", available: false },
    { label: "P", available: true },
    { label: "M", available: true },
    { label: "G", available: true },
    { label: "GG", available: false },
  ],
  reviews: [
    {
      id: "1",
      initials: "JL",
      user: "Julia Lima",
      time: "há 2 semanas",
      rating: 4,
      text: "Qualidade do tecido é excelente. Só achei que o frete poderia ser um pouco mais rápido.",
      storeReply:
        "Obrigada, Julia! Já ajustamos a janela de coleta com os entregadores.",
    },
    {
      id: "2",
      initials: "MC",
      user: "Maria Costa",
      time: "há 3 dias",
      rating: 5,
      text: "Lindo o vestido, igual ao da foto. Caimento e tecido ótimos.",
    },
  ],
};

export function useProduct() {
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("G");

  // Mockado até existir a rota do carrinho
  const [cartCount] = useState(2);

  function handleBack() {
    navigation.goBack();
  }

  function handleToggleFavorite() {
    setIsFavorite((prev) => !prev);
  }

  function handleGoToStore() {
    console.log("ir para a loja");
  }

  function handleGoToCart() {
    navigation.navigate("Cart");
  }

  function handleOpenSizeTable() {
    console.log("abrir tabela de medidas");
  }

  function handleOpenDelivery() {
    console.log("abrir entrega");
  }

  function handleAddToCart() {
    console.log("adicionar ao carrinho", PRODUCT_MOCK.title, selectedSize);
  }

  return {
    product: PRODUCT_MOCK,
    images: PRODUCT_IMAGES,
    selectedImage,
    setSelectedImage,
    selectedSize,
    setSelectedSize,
    isFavorite,
    cartCount,
    handleBack,
    handleToggleFavorite,
    handleGoToStore,
    handleGoToCart,
    handleOpenSizeTable,
    handleOpenDelivery,
    handleAddToCart,
  };
}
