import type {
  OrderDeliveryAddressDTO,
  OrderDTO,
  OrderPaymentDTO,
} from "./orders";

export type CheckoutPaymentMethod = "CREDIT_CARD" | "DEBIT_CARD" | "PIX";

export type CheckoutItemStatus =
  | "OK"
  | "PRICE_CHANGED"
  | "INSUFFICIENT_QUANTITY"
  | "OUT_OF_STOCK"
  | "PRODUCT_INACTIVE";

export type CheckoutReviewIssueDTO = {
  type?: string;
  blocking?: boolean;
  cartItemId?: number | null;
  message?: string;
};

export type CheckoutReviewItemDTO = {
  cartItemId?: number;
  stockId?: number;
  productId?: number;
  productName?: string;
  photoUrl?: string | null;
  size?: string;
  quantity?: number;
  availableQuantity?: number;
  cartUnitPrice?: number;
  currentUnitPrice?: number;
  subtotal?: number;
  status?: CheckoutItemStatus;
};

export type CheckoutReviewDTO = {
  reviewToken?: string | null;
  canConfirm?: boolean;
  storeId?: number;
  storeName?: string;
  deliveryAddressId?: number | null;
  deliveryAddress?: OrderDeliveryAddressDTO | null;
  items?: CheckoutReviewItemDTO[];
  itemsSubtotal?: number;
  shippingAmount?: number;
  totalAmount?: number;
  issues?: CheckoutReviewIssueDTO[];
};

export type CheckoutResponseDTO = {
  payment?: OrderPaymentDTO;
  order?: OrderDTO | null;
};

export type CheckoutReviewItem = {
  id: number;
  name: string;
  size: string;
  quantity: number;
  subtotal: number;
  photoUrl: string | null;
  status: CheckoutItemStatus;
};

export type CheckoutIssue = {
  message: string;
  blocking: boolean;
};

export type CheckoutReview = {
  reviewToken: string | null;
  canConfirm: boolean;
  storeName: string;
  address?: string;
  items: CheckoutReviewItem[];
  subtotal: number;
  shipping: number;
  total: number;
  issues: CheckoutIssue[];
};
