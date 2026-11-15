import { createContext, useContext, useState, type ReactNode } from "react";

import type { CartStore } from "../Hooks/useCart";
import { ACTIVE_ORDERS, ORDER_HISTORY } from "../Screens/Orders/Data/data";
import type { Order, OrderProduct } from "../Types/orders";

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
};

const OrdersContext = createContext<OrdersContextData | undefined>(undefined);

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

    if (products.length === 0) {
      return;
    }

    const subtotal = products.reduce(
      (sum, product) => sum + (product.price ?? 0) * (product.quantity ?? 1),
      0,
    );

    const deliveryFee = stores.reduce(
      (sum, store) => sum + store.deliveryFee,
      0,
    );

    const discount = Math.max(0, subtotal + deliveryFee - total);

    const firstProduct = products[0];

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
    };

    setActiveOrders((previous) => {
      const alreadyExists = previous.some(
        (order) => order.protocol === protocol,
      );

      if (alreadyExists) {
        return previous;
      }

      return [newOrder, ...previous];
    });
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
