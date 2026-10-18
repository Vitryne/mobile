import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

// Mockado até a API de produto existir
const PRODUCT_IMAGES = [
  require("../../../assets/Images/detail_1.jpg"),
  require("../../../assets/Images/detail_2.jpg"),
  require("../../../assets/Images/detail_3.jpg"),
];

export function useProduct() {
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

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
    console.log("ir para o carrinho");
  }

  return {
    images: PRODUCT_IMAGES,
    selectedImage,
    setSelectedImage,
    isFavorite,
    cartCount,
    handleBack,
    handleToggleFavorite,
    handleGoToStore,
    handleGoToCart,
  };
}