import { fetchOrders } from "@/Customer/Api/orders";
import type { Order } from "@/Customer/Types/orders";
import { ApiError } from "@/Shared/Api/apiConfig";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export function getOrdersErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError) {
    if (error.status === 401 || error.status === 403) {
      return "Faça login para ver seus pedidos.";
    }
    if (error.status === 408) {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (error.status === 0) return "Sem conexão com o servidor.";
  }

  return fallback;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadOrders = useCallback(async (isActive: () => boolean) => {
    setLoadError(null);

    try {
      const data = await fetchOrders();

      if (isActive()) setOrders(data);
    } catch (error) {
      if (isActive()) {
        setLoadError(
          getOrdersErrorMessage(
            error,
            "Não foi possível carregar seus pedidos.",
          ),
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Recarrega sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      let active = true;

      loadOrders(() => active);

      return () => {
        active = false;
      };
    }, [loadOrders]),
  );

  function reload() {
    setIsLoading(true);
    loadOrders(() => true);
  }

  const activeOrders = orders.filter(
    (order) => order.status !== "delivered" && order.status !== "canceled",
  );

  return {
    orders,
    activeOrders,
    orderHistory: orders,
    isLoading,
    loadError,
    reload,
  };
}
