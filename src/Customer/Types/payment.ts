import type { CartStore } from "../Hooks/useCart";

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
  stores: CartStore[];
  subtotal: number;
  delivery: number;
  discount: number;
  total: number;
  onCoupon: () => void;
};
