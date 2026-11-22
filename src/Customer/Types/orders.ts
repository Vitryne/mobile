import type { ImageSourcePropType } from "react-native";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready_for_pickup"
  | "delivering"
  | "delivered"
  | "canceled";

export type OrderProduct = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  size?: string;
  quantity?: number;
  price?: number;
  storeName?: string;
};

export type Order = {
  id: string;
  protocol: string;
  store: string;
  date: string;
  productName: string;
  itemCount: number;
  total: number;
  status: OrderStatus;
  image: ImageSourcePropType;
  products: OrderProduct[];
  estimatedTime?: string;
  subtotal?: number;
  deliveryFee?: number;
  discount?: number;
  paymentMethod?: "pix" | "card";
  address?: string;
  pickupCode?: string;
  deliveryCode?: string;
};

export type FeaturedOrderProps = {
  order: Order;
  onPressDetails?: (order: Order) => void;
};

export type OrderHistoryCardProps = {
  order: Order;
  onPress?: (order: Order) => void;
};

export type OrderItemDTO = {
  id?: number;
  stockId?: number;
  productName?: string;
  photoUrl?: string | null;
  size?: string;
  quantity?: number;
  unitPrice?: number;
  subtotal?: number;
};

export type OrderPaymentDTO = {
  id?: number;
  amount?: number;
  method?: "CREDIT_CARD" | "DEBIT_CARD" | "PIX";
  result?: "APPROVED" | "DECLINED";
  createdAt?: string;
};

export type OrderDeliveryAddressDTO = {
  zipCode?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  complement?: string;
  city?: string;
  state?: string;
};

export type OrderDTO = {
  id?: number;
  userId?: number;
  storeId?: number;
  storeName?: string;
  status?: "CONFIRMED" | "PREPARING";
  itemsSubtotal?: number;
  shippingAmount?: number;
  totalAmount?: number;
  deliveryAddress?: OrderDeliveryAddressDTO | null;
  payment?: OrderPaymentDTO | null;
  items?: OrderItemDTO[];
  createdAt?: string;
  updatedAt?: string;
};
