export type CartItemDTO = {
  id?: number;
  stockId?: number;
  productId?: number;
  productName?: string;
  photoUrl?: string | null;
  size?: string;
  quantity?: number;
  unitPrice?: number;
  subtotal?: number;
};

export type CartResponseDTO = {
  id?: number;
  userId?: number;
  totalValueForecast?: number;
  updatedAt?: string;
  items?: CartItemDTO[];
};

export type CartItem = {
  id: number;
  stockId: number;
  productId: number;
  name: string;
  size: string;
  quantity: number;
  price: number;
  subtotal: number;
  photoUrl: string | null;
};

export type Cart = {
  items: CartItem[];
  total: number;
};
