import { checkout } from "@/Customer/Api/checkout";
import type { CheckoutPaymentMethod } from "@/Customer/Types/checkout";
import type { Order } from "@/Customer/Types/orders";
import { ApiError } from "@/Shared/Api/apiConfig";
import { createIdempotencyKey } from "@/Shared/Utils/createIdempotencyKey";
import { useRef, useState } from "react";

type PendingAttempt = {
  key: string;
  reviewToken: string;
  paymentMethod: CheckoutPaymentMethod;
};

type CheckoutResult =
  | { ok: true; order: Order }
  | { ok: false; message: string; reviewChanged: boolean };

function getCheckoutErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401 || error.status === 403) {
      return "Faça login para finalizar o pedido.";
    }
    if (error.status === 402) return "Pagamento recusado.";
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

  // Mesma chave só ao repetir uma tentativa que caiu por rede/timeout
  const pendingAttemptRef = useRef<PendingAttempt | null>(null);

  function getIdempotencyKey(
    reviewToken: string,
    paymentMethod: CheckoutPaymentMethod,
  ) {
    const pending = pendingAttemptRef.current;

    if (
      pending &&
      pending.reviewToken === reviewToken &&
      pending.paymentMethod === paymentMethod
    ) {
      return pending.key;
    }

    const key = createIdempotencyKey();
    pendingAttemptRef.current = { key, reviewToken, paymentMethod };
    return key;
  }

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

    const idempotencyKey = getIdempotencyKey(reviewToken, paymentMethod);

    try {
      const order = await checkout(reviewToken, paymentMethod, idempotencyKey);
      pendingAttemptRef.current = null;

      if (!order) {
        return {
          ok: false,
          message: "Pagamento recusado.",
          reviewChanged: false,
        };
      }

      return { ok: true, order };
    } catch (error) {
      const isRetryable =
        error instanceof ApiError &&
        (error.status === 0 || error.status === 408);

      if (!isRetryable) pendingAttemptRef.current = null;

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
