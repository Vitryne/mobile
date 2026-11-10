import { fetchProducts } from "@/Customer/Api/product";
import type { Product } from "@/Customer/Types/product";
import { ApiError } from "@/Shared/Api/apiConfig";
import { useEffect, useState } from "react";

function getProductsErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 408) {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (error.status === 0) return "Sem conexão com o servidor.";
  }

  return "Não foi possível carregar os produtos.";
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchProducts();

        if (isActive) setProducts(data);
      } catch (error) {
        if (isActive) setErrorMessage(getProductsErrorMessage(error));
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [reloadKey]);

  function reload() {
    setReloadKey((previous) => previous + 1);
  }

  return {
    products,
    isLoading,
    errorMessage,
    reload,
  };
}
