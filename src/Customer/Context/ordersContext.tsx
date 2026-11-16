import { createContext, useContext, useState, type ReactNode } from "react";

import type { CartStore } from "../Hooks/useCart";
import { ACTIVE_ORDERS, ORDER_HISTORY } from "../Screens/Orders/Data/data";
import type { Order, OrderProduct, OrderStatus } from "../Types/orders";

type CreateOrderInput = {
  protocol: string;
  total: number;
  stores: CartStore[];
};

type OrdersContextData = {
  activeOrders: Order[];
  orderHistory: Order[];
  getOrderById: (id: string) => Order | undefined;
  addConfirmedOrder: (input: CreateOrderInput) => void;
  advanceOrderStatus: (id: string) => void;
};

const STATUS_SEQUENCE: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "ready_for_pickup",
  "delivering",
  "delivered",
];

const OrdersContext = createContext<OrdersContextData | undefined>(undefined);

function createMockCode(protocol: string, offset: number) {
  const digits = protocol.replace(/\D/g, "");
  const number = Number(digits.slice(-6)) || 3194;

  return String((number + offset) % 10000).padStart(4, "0");
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [activeOrders, setActiveOrders] = useState<Order[]>(ACTIVE_ORDERS);

  const [orderHistory] = useState<Order[]>(ORDER_HISTORY);

  function addConfirmedOrder({ protocol, total, stores }: CreateOrderInput) {
    const products: OrderProduct[] = stores.flatMap((store) =>
      store.items.map((item) => ({
        id: String(item.id),
        name: item.name,
        image: item.image,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        storeName: store.name,
      })),
    );

    if (products.length === 0) return;

    const firstProduct = products[0];

    const subtotal = products.reduce(
      (sum, product) => sum + (product.price ?? 0) * (product.quantity ?? 1),
      0,
    );

    const deliveryFee = stores.reduce(
      (sum, store) => sum + store.deliveryFee,
      0,
    );

    const discount = Math.max(0, subtotal + deliveryFee - total);

    const newOrder: Order = {
      id: protocol,
      protocol,
      store: stores.length === 1 ? stores[0].name : `${stores.length} lojas`,
      date: new Date().toLocaleString("pt-BR"),
      productName: firstProduct.name,
      itemCount: products.reduce(
        (sum, product) => sum + (product.quantity ?? 1),
        0,
      ),
      total,
      status: "pending",
      image: firstProduct.image,
      products,
      estimatedTime: "12-18 MIN",
      subtotal,
      deliveryFee,
      discount,
      paymentMethod: "pix",
      address: "Rua das Palmeiras, 218 · Zona 7 · Maringá",
      pickupCode: createMockCode(protocol, 2330),
      deliveryCode: createMockCode(protocol, 1635),
    };

    setActiveOrders((previous) => {
      if (previous.some((order) => order.protocol === protocol)) {
        return previous;
      }

      return [newOrder, ...previous];
    });
  }

  function advanceOrderStatus(id: string) {
    setActiveOrders((previous) =>
      previous.map((order) => {
        if (order.id !== id && order.protocol !== id) {
          return order;
        }

        const currentIndex = STATUS_SEQUENCE.indexOf(order.status);

        if (currentIndex < 0 || currentIndex >= STATUS_SEQUENCE.length - 1) {
          return order;
        }

        return {
          ...order,
          status: STATUS_SEQUENCE[currentIndex + 1],
          pickupCode: order.pickupCode ?? createMockCode(order.protocol, 2330),
          deliveryCode:
            order.deliveryCode ?? createMockCode(order.protocol, 1635),
        };
      }),
    );
  }

  function getOrderById(id: string) {
    return [...activeOrders, ...orderHistory].find(
      (order) => order.id === id || order.protocol === id,
    );
  }

  return (
    <OrdersContext.Provider
      value={{
        activeOrders,
        orderHistory,
        getOrderById,
        addConfirmedOrder,
        advanceOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders deve ser utilizado dentro de OrdersProvider");
  }

  return context;
}
