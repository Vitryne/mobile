import type { OrderProduct, OrderStatus } from "./orders";

export type OrderDetailsHeaderProps = {
  protocol: string;
  store: string;
  onBack: () => void;
};

export type OrderDetailsStatusProps = {
  status: OrderStatus;
  date: string;
  onBuyAgain: () => void;
};

export type OrderDetailsProductsProps = {
  products: OrderProduct[];
};

export type OrderDetailsInfoProps = {
  icon: "map-pin" | "credit-card";
  title: string;
  description: string;
};

export type OrderDetailsTotalsProps = {
  subtotal?: number;
  delivery?: number;
  discount?: number;
  total: number;
};
