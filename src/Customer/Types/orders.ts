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
  onAdvanceStatus?: (order: Order) => void;
};

export type OrderHistoryCardProps = {
  order: Order;
  onPress?: (order: Order) => void;
};
