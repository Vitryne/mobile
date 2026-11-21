import type { CartItem } from "./cart";

export type PaymentMethod = "pix" | "savedCard" | "newCard";

export type DeliveryAddressProps = {
  onChange: () => void;
};

export type PaymentHeaderProps = {
  onBack: () => void;
};

export type PaymentFooterProps = {
  onConfirm: () => void;
};

export type PaymentMethodsProps = {
  selected: PaymentMethod;
  onSelect: (value: PaymentMethod) => void;
};

export type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  onCoupon: () => void;
};
