import type { ImageSourcePropType } from "react-native";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "delivered"
  | "canceled";

export type OrderProduct = {
  id: string;
  name: string;
  image: ImageSourcePropType;
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
};

export type FeaturedOrderProps = {
  order: Order;
  onPressDetails?: (order: Order) => void;
};

export type OrderHistoryCardProps = {
  order: Order;
  onPress?: (order: Order) => void;
};
