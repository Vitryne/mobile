import { formatAddress, mapOrder } from "@/Customer/Api/orders";
import type {
  CheckoutPaymentMethod,
  CheckoutResponseDTO,
  CheckoutReview,
  CheckoutReviewDTO,
} from "@/Customer/Types/checkout";
import type { Order } from "@/Customer/Types/orders";
import { api } from "@/Shared/Api/apiConfig";

function mapCheckoutReview(dto: CheckoutReviewDTO): CheckoutReview {
  const items = (dto.items ?? []).map((item, index) => ({
    id: item.cartItemId ?? index,
    name: item.productName ?? "",
    size: item.size ?? "",
    quantity: item.quantity ?? 0,
    subtotal: item.subtotal ?? 0,
    photoUrl: item.photoUrl || null,
    status: item.status ?? "OK",
  }));

  const issues = (dto.issues ?? [])
    .filter((issue) => Boolean(issue.message))
    .map((issue) => ({
      message: issue.message ?? "",
      blocking: issue.blocking ?? false,
    }));

  return {
    reviewToken: dto.reviewToken ?? null,
    canConfirm: Boolean(dto.canConfirm && dto.reviewToken),
    storeName: dto.storeName ?? "",
    address: formatAddress(dto.deliveryAddress),
    items,
    subtotal: dto.itemsSubtotal ?? 0,
    shipping: dto.shippingAmount ?? 0,
    total: dto.totalAmount ?? 0,
    issues,
  };
}

/**
 * GET /orders/checkout/review
 */
async function fetchCheckoutReview(): Promise<CheckoutReview> {
  const response = await api.get<CheckoutReviewDTO>("/orders/checkout/review");
  return mapCheckoutReview(response.data);
}

/**
 * POST /orders/checkout
 */
async function checkout(
  reviewToken: string,
  paymentMethod: CheckoutPaymentMethod,
): Promise<Order | null> {
  const response = await api.post<CheckoutResponseDTO>("/orders/checkout", {
    reviewToken,
    paymentMethod,
  });

  return response.data.order ? mapOrder(response.data.order) : null;
}

export { checkout, fetchCheckoutReview, mapCheckoutReview };
