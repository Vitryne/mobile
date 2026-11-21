import {
  clearCart,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from "@/Customer/Api/cart";
import type { Cart, CartItem } from "@/Customer/Types/cart";
import { ApiError } from "@/Shared/Api/apiConfig";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";

const EMPTY_CART: Cart = { items: [], total: 0 };

export function getCartErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError) {
    if (error.status === 401 || error.status === 403) {
      return "Faça login para acessar sua sacola.";
    }
    if (error.status === 408) {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (error.status === 0) return "Sem conexão com o servidor.";
    if (error.status === 409) return error.message;
  }

  return fallback;
}

export function useCart() {
  const [cart, setCart] = useState<Cart>(EMPTY_CART);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  // Evita duas alterações ao mesmo tempo (ex.: toques rápidos no +)
  const isUpdatingRef = useRef(false);

  const loadCart = useCallback(async (isActive: () => boolean) => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const data = await fetchCart();

      if (isActive()) setCart(data);
    } catch (error) {
      if (isActive()) {
        setLoadError(
          getCartErrorMessage(error, "Não foi possível carregar a sacola."),
        );
      }
    } finally {
      if (isActive()) setIsLoading(false);
    }
  }, []);

  // Recarrega sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      let active = true;

      loadCart(() => active);

      return () => {
        active = false;
      };
    }, [loadCart]),
  );

  async function runUpdate(action: () => Promise<Cart>) {
    if (isUpdatingRef.current) return;

    isUpdatingRef.current = true;
    setUpdateError(null);

    try {
      setCart(await action());
    } catch (error) {
      setUpdateError(
        getCartErrorMessage(error, "Não foi possível atualizar a sacola."),
      );
    } finally {
      isUpdatingRef.current = false;
    }
  }

  function increase(item: CartItem) {
    runUpdate(() => updateCartItem(item.id, item.quantity + 1));
  }

  // Com 1 unidade, pede confirmação antes de remover
  function decrease(item: CartItem) {
    if (item.quantity <= 1) {
      setItemToRemove(item);
      return;
    }

    runUpdate(() => updateCartItem(item.id, item.quantity - 1));
  }

  function confirmRemove() {
    if (!itemToRemove) return;

    const itemId = itemToRemove.id;
    setItemToRemove(null);
    runUpdate(() => removeCartItem(itemId));
  }

  function cancelRemove() {
    setItemToRemove(null);
  }

  function clearAll() {
    runUpdate(clearCart);
  }

  function reload() {
    loadCart(() => true);
  }

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    items: cart.items,
    itemCount,
    total: cart.total,
    isEmpty: cart.items.length === 0,
    isLoading,
    loadError,
    updateError,
    itemToRemove,
    increase,
    decrease,
    confirmRemove,
    cancelRemove,
    clearAll,
    reload,
  };
}
