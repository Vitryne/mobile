import { api } from "../../Shared/Api/apiConfig";
import {
  Cart,
  CartItem,
  CartResponseDTO
} from "../Types/cartMenu";

async function fetchCart(userId: number): Promise<Cart> {
  const response = await api.get<CartResponseDTO>(`/carrinho/${userId}`);
  const cart = response.data;

  const items: CartItem[] = (cart?.itens ?? []).map((item) => {
    const id = item?.id;
    const productId = item?.produtoId;
    const quantity = item?.quantidade;
    const unitPrice = item?.precoUnitario;

    return {
      id,
      productId,
      quantity,
      unitPrice,
      subtotal: unitPrice * quantity,
    };
  });

  return {
    id: cart?.id,
    userId: cart?.usuarioId,
    items,
    total: cart?.total,
  };
}

async function addItem(
  userId: number,
  productId: number,
  quantity: number,
): Promise<Cart> {
  const response = await api.post<CartResponseDTO>(
    `/carrinho/${userId}/itens`,
    { produtoId: productId, quantidade: quantity },
  );
  const cart = response.data;

  const items: CartItem[] = (cart?.itens ?? []).map((item) => {
    const id = item?.id;
    const itemProductId = item?.produtoId;
    const itemQuantity = item?.quantidade;
    const unitPrice = item?.precoUnitario;

    return {
      id,
      productId: itemProductId,
      quantity: itemQuantity,
      unitPrice,
      subtotal: unitPrice * itemQuantity,
    };
  });

  return {
    id: cart?.id,
    userId: cart?.usuarioId,
    items,
    total: cart?.total,
  };
}

async function updateItemQuantity(
  userId: number,
  itemId: number,
  quantity: number,
): Promise<Cart> {
  const response = await api.put<CartResponseDTO>(
    `/carrinho/${userId}/itens/${itemId}`,
    { quantidade: quantity },
  );
  const cart = response.data;

  const items: CartItem[] = (cart?.itens ?? []).map((item) => {
    const id = item?.id;
    const productId = item?.produtoId;
    const itemQuantity = item?.quantidade;
    const unitPrice = item?.precoUnitario;

    return {
      id,
      productId,
      quantity: itemQuantity,
      unitPrice,
      subtotal: unitPrice * itemQuantity,
    };
  });

  return {
    id: cart?.id,
    userId: cart?.usuarioId,
    items,
    total: cart?.total,
  };
}

async function removeItem(
  userId: number,
  itemId: number,
): Promise<Cart> {
  const response = await api.delete<CartResponseDTO>(
    `/carrinho/${userId}/itens/${itemId}`,
  );
  const cart = response.data;

  const items: CartItem[] = (cart?.itens ?? []).map((item) => {
    const id = item?.id;
    const productId = item?.produtoId;
    const quantity = item?.quantidade;
    const unitPrice = item?.precoUnitario;

    return {
      id,
      productId,
      quantity,
      unitPrice,
      subtotal: unitPrice * quantity,
    };
  });

  return {
    id: cart?.id,
    userId: cart?.usuarioId,
    items,
    total: cart?.total,
  };
}

async function clearCart(userId: number): Promise<Cart> {
  const response = await api.delete<CartResponseDTO>(
    `/carrinho/${userId}/itens`,
  );
  const cart = response.data;

  return {
    id: cart?.id,
    userId: cart?.usuarioId,
    items: [],
    total: cart?.total,
  };
}

export {
  addItem, clearCart, fetchCart, removeItem, updateItemQuantity
};

