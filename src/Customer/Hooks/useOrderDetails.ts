import { fetchOrder } from "@/Customer/Api/orders";
import { getOrdersErrorMessage } from "@/Customer/Hooks/useOrders";
import type { Order } from "@/Customer/Types/orders";
import { ApiError } from "@/Shared/Api/apiConfig";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export function useOrderDetails(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadOrder = useCallback(
    async (isActive: () => boolean) => {
      setNotFound(false);
      setLoadError(null);

      try {
        const data = await fetchOrder(orderId);

        if (isActive()) setOrder(data);
      } catch (error) {
        if (!isActive()) return;

        if (error instanceof ApiError && error.status === 404) {
          setNotFound(true);
        } else {
          setLoadError(
            getOrdersErrorMessage(error, "Não foi possível carregar o pedido."),
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [orderId],
  );

  // Recarrega sempre que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      let active = true;

      loadOrder(() => active);

      return () => {
        active = false;
      };
    }, [loadOrder]),
  );

  function reload() {
    setIsLoading(true);
    loadOrder(() => true);
  }

  return { order, isLoading, notFound, loadError, reload };
}
