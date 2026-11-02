import { useState } from "react";
import type { ImageSourcePropType } from "react-native";

export type CartItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: ImageSourcePropType;
};

export type CartStore = {
  id: string;
  name: string;
  logo: ImageSourcePropType;
  deliveryTime: string;
  deliveryFee: number;
  items: CartItem[];
};

export function useCart(initialStores: CartStore[]) {
  const [stores, setStores] = useState<CartStore[]>(initialStores);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  function changeQuantity(itemId: string, delta: number) {
    setStores((previous) =>
      previous.map((store) => ({
        ...store,
        items: store.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        ),
      })),
    );
  }

  function increase(itemId: string) {
    changeQuantity(itemId, 1);
  }

  // Com 1 unidade, pede confirmação antes de remover
  function decrease(item: CartItem) {
    if (item.quantity <= 1) {
      setItemToRemove(item);
      return;
    }
    changeQuantity(item.id, -1);
  }

  // A loja some da sacola quando fica sem itens
  function confirmRemove() {
    if (!itemToRemove) return;

    setStores((previous) =>
      previous
        .map((store) => ({
          ...store,
          items: store.items.filter((item) => item.id !== itemToRemove.id),
        }))
        .filter((store) => store.items.length > 0),
    );
    setItemToRemove(null);
  }

  function cancelRemove() {
    setItemToRemove(null);
  }

  function clearAll() {
    setStores([]);
  }

  const allItems = stores.flatMap((store) => store.items);
  const itemCount = allItems.reduce((sum, item) => sum + item.quantity, 0);
  const storeCount = stores.length;
  const subtotal = allItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = stores.reduce((sum, store) => sum + store.deliveryFee, 0);
  const total = subtotal + delivery;

  return {
    stores,
    itemToRemove,
    itemCount,
    storeCount,
    subtotal,
    delivery,
    total,
    isEmpty: stores.length === 0,
    increase,
    decrease,
    confirmRemove,
    cancelRemove,
    clearAll,
  };
}
