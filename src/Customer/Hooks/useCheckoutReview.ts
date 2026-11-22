import { fetchCheckoutReview } from "@/Customer/Api/checkout";
import type { CheckoutReview } from "@/Customer/Types/checkout";
import { ApiError } from "@/Shared/Api/apiConfig";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

function getReviewErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401 || error.status === 403) {
      return "Faça login para finalizar a compra.";
    }
    if (error.status === 408) {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (error.status === 0) return "Sem conexão com o servidor.";
    if (error.status === 400 || error.status === 409) return error.message;
  }

  return "Não foi possível revisar sua compra.";
}

export function useCheckoutReview() {
  const [review, setReview] = useState<CheckoutReview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadReview = useCallback(async (isActive: () => boolean) => {
    setLoadError(null);

    try {
      const data = await fetchCheckoutReview();

      if (isActive()) setReview(data);
    } catch (error) {
      if (isActive()) setLoadError(getReviewErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Revisa de novo sempre que a tela ganha foco (ex.: volta do PIX)
  useFocusEffect(
    useCallback(() => {
      let active = true;

      loadReview(() => active);

      return () => {
        active = false;
      };
    }, [loadReview]),
  );

  function reload() {
    setIsLoading(true);
    loadReview(() => true);
  }

  return { review, isLoading, loadError, reload };
}
