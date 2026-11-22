import type { CheckoutIssue, CheckoutReviewItem } from "./checkout";

export type PaymentMethod = "pix" | "savedCard" | "newCard";

export type DeliveryAddressProps = {
  address?: string;
  onChange: () => void;
};

export type PaymentHeaderProps = {
  onBack: () => void;
};

export type PaymentFooterProps = {
  onConfirm: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};

export type PaymentMethodsProps = {
  selected: PaymentMethod;
  onSelect: (value: PaymentMethod) => void;
};

export type OrderSummaryProps = {
  items: CheckoutReviewItem[];
  subtotal: number;
  delivery: number;
  total: number;
  onCoupon: () => void;
};

export type CheckoutIssuesProps = {
  issues: CheckoutIssue[];
};
