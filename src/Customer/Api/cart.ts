import type { Cart, CartResponseDTO } from "@/Customer/Types/cart";
import { api } from "@/Shared/Api/apiConfig";

function mapCart(dto: CartResponseDTO): Cart {
  const items = (dto.items ?? []).map((item) => {
    const price = item.unitPrice ?? 0;
    const quantity = item.quantity ?? 0;

    return {
      id: item.id ?? 0,
      stockId: item.stockId ?? 0,
      productId: item.productId ?? 0,
      name: item.productName ?? "",
      size: item.size ?? "",
      quantity,
      price,
      subtotal: item.subtotal ?? price * quantity,
      photoUrl: item.photoUrl || null,
    };
  });

  return {
    items,
    total:
      dto.totalValueForecast ??
      items.reduce((sum, item) => sum + item.subtotal, 0),
  };
}

/**
 * GET /cart
 */
async function fetchCart(): Promise<Cart> {
  const response = await api.get<CartResponseDTO>("/cart");
  return mapCart(response.data);
}

/**
 * POST /cart/items
 */
async function addCartItem(stockId: number, quantity: number): Promise<Cart> {
  const response = await api.post<CartResponseDTO>("/cart/items", {
    stockId,
    quantity,
  });
  return mapCart(response.data);
}

/**
 * PUT /cart/items/{itemId}
 */
async function updateCartItem(itemId: number, quantity: number): Promise<Cart> {
  const response = await api.put<CartResponseDTO>(`/cart/items/${itemId}`, {
    quantity,
  });
  return mapCart(response.data);
}

/**
 * DELETE /cart/items/{itemId}
 */
async function removeCartItem(itemId: number): Promise<Cart> {
  const response = await api.delete<CartResponseDTO>(`/cart/items/${itemId}`);
  return mapCart(response.data);
}

/**
 * DELETE /cart/items
 */
async function clearCart(): Promise<Cart> {
  const response = await api.delete<CartResponseDTO>("/cart/items");
  return mapCart(response.data);
}

export {
  addCartItem,
  clearCart,
  fetchCart,
  mapCart,
  removeCartItem,
  updateCartItem,
};
