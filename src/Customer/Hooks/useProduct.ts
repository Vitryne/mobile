import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function useProduct() {
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);

  // Mockado até existir a rota do carrinho
  const [cartCount] = useState(2);

  function handleBack() {
    navigation.goBack();
  }

  function handleToggleFavorite() {
    setIsFavorite((prev) => !prev);
  }

  // Rota da loja ainda não existe
  function handleGoToStore() {
    console.log("ir para a loja");
  }

  // Rota do carrinho ainda não existe
  function handleGoToCart() {
    console.log("ir para o carrinho");
  }

  return {
    isFavorite,
    cartCount,
    handleBack,
    handleToggleFavorite,
    handleGoToStore,
    handleGoToCart,
  };
}