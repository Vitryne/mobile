import type {
  Order,
  OrderDeliveryAddressDTO,
  OrderDTO,
  OrderStatus,
} from "@/Customer/Types/orders";
import { api } from "@/Shared/Api/apiConfig";

// Usada quando o item do pedido não traz foto
const DEFAULT_IMAGE = require("../../../assets/Images/detail_1.jpg");

const ORDER_STATUS_MAP: Record<string, OrderStatus> = {
  AWAITING_ACCEPTANCE: "pending",
  CONFIRMED: "confirmed",
  PREPARING: "preparing",
  READY_FOR_PICKUP: "ready_for_pickup",
  OUT_FOR_DELIVERY: "delivering",
  DELIVERED: "delivered",
  CANCELED: "canceled",
};

function mapOrderStatus(status?: string): OrderStatus {
  return (status && ORDER_STATUS_MAP[status]) || "pending";
}

function formatOrderDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// "rua, número - complemento · bairro · cidade/UF", omitindo partes vazias
function formatAddress(address?: OrderDeliveryAddressDTO | null) {
  if (!address) return undefined;

  const streetLine = [address.street, address.number]
    .filter(Boolean)
    .join(", ");
  const firstPart = [streetLine, address.complement]
    .filter(Boolean)
    .join(" - ");
  const cityPart = [address.city, address.state].filter(Boolean).join("/");

  const result = [firstPart, address.neighborhood, cityPart]
    .filter(Boolean)
    .join(" · ");

  return result || undefined;
}

function mapOrder(dto: OrderDTO): Order {
  const storeName = dto.storeName ?? "";

  const products = (dto.items ?? []).map((item, index) => ({
    id: String(item.id ?? index),
    name: item.productName ?? "",
    image: item.photoUrl ? { uri: item.photoUrl } : DEFAULT_IMAGE,
    size: item.size,
    quantity: item.quantity ?? 0,
    price: item.unitPrice ?? 0,
    storeName,
  }));

  return {
    id: String(dto.id ?? ""),
    protocol: `#${dto.id ?? ""}`,
    store: storeName,
    date: formatOrderDate(dto.createdAt),
    productName: products[0]?.name ?? "",
    itemCount: products.reduce((sum, product) => sum + product.quantity, 0),
    total: dto.totalAmount ?? 0,
    status: mapOrderStatus(dto.status),
    image: products[0]?.image ?? DEFAULT_IMAGE,
    products,
    subtotal: dto.itemsSubtotal ?? 0,
    deliveryFee: dto.shippingAmount ?? 0,
    discount: 0,
    paymentMethod: dto.payment?.method === "PIX" ? "pix" : "card",
    address: formatAddress(dto.deliveryAddress),
  };
}

/**
 * GET /orders
 */
async function fetchOrders(): Promise<Order[]> {
  const response = await api.get<OrderDTO[]>("/orders");
  return (response.data ?? []).map(mapOrder);
}

/**
 * GET /orders/{id}
 */
async function fetchOrder(id: string): Promise<Order> {
  const response = await api.get<OrderDTO>(`/orders/${id}`);
  return mapOrder(response.data);
}

export { fetchOrder, fetchOrders, formatAddress, mapOrder, mapOrderStatus };
