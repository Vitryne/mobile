export interface CartItemDTO {
  id: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

export interface CartResponseDTO {
  id: number;
  usuarioId: number;
  itens: CartItemDTO[];
  total: number;
}

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type Cart = {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
};