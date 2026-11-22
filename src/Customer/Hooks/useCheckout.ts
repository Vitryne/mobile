import { checkout } from "@/Customer/Api/checkout";
import type { CheckoutPaymentMethod } from "@/Customer/Types/checkout";
import type { Order } from "@/Customer/Types/orders";
import { ApiError } from "@/Shared/Api/apiConfig";
import { useRef, useState } from "react";

type CheckoutResult =
  | { ok: true; order: Order }
  | { ok: false; message: string; reviewChanged: boolean };

function getCheckoutErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401 || error.status === 403) {
      return "Faça login para finalizar o pedido.";
    }
    if (error.status === 408) {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (error.status === 0) return "Sem conexão com o servidor.";
    if (error.status === 400 || error.status === 409) return error.message;
  }

  return "Não foi possível finalizar o pedido.";
}

export function useCheckout() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Evita dois checkouts ao mesmo tempo (ex.: toques repetidos)
  const isSubmittingRef = useRef(false);

  // Confirma o pedido com os valores revisados (reviewToken)
  async function confirmOrder(
    reviewToken: string,
    paymentMethod: CheckoutPaymentMethod,
  ): Promise<CheckoutResult> {
    if (isSubmittingRef.current) {
      return {
        ok: false,
        message: "Aguarde, o pedido está sendo enviado.",
        reviewChanged: false,
      };
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const order = await checkout(reviewToken, paymentMethod);

      if (!order) {
        return {
          ok: false,
          message: "Pagamento recusado.",
          reviewChanged: false,
        };
      }

      return { ok: true, order };
    } catch (error) {
      // 409: a sacola mudou desde a revisão
      return {
        ok: false,
        message: getCheckoutErrorMessage(error),
        reviewChanged: error instanceof ApiError && error.status === 409,
      };
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return { isSubmitting, confirmOrder };
}
