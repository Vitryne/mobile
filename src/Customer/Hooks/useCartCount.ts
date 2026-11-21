import { fetchCart } from "@/Customer/Api/cart";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

// Quantidade de unidades na sacola, atualizada sempre que a tela ganha foco
export function useCartCount() {
  const [cartCount, setCartCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      fetchCart()
        .then((cart) => {
          if (!isActive) return;
          setCartCount(
            cart.items.reduce((sum, item) => sum + item.quantity, 0),
          );
        })
        .catch(() => {
          // Sem login ou sem conexão: o contador apenas não aparece
          if (isActive) setCartCount(0);
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  return { cartCount, setCartCount };
}
