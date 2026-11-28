import { getAddresses, selectAddress } from "@/Customer/Api/address";
import {
  chooseOrderAddress,
  getOriginalDefaultAddressId,
  keepSelectedAsDefault,
  onDefaultAddressRestored,
} from "@/Customer/Hooks/useOrderAddress";
import type { ClientAddress } from "@/Customer/Types/address";
import { ApiError } from "@/Shared/Api/apiConfig";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

export function getAddressErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError) {
    if (error.status === 401 || error.status === 403) {
      return "Faça login para ver seus endereços.";
    }
    if (error.status === 404) return "Endereço não encontrado.";
    if (error.status === 408) {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (error.status === 0) return "Sem conexão com o servidor.";
    if (error.status === 400 || error.status === 409) return error.message;
  }

  return fallback;
}

export function useAddresses() {
  const [addresses, setAddresses] = useState<ClientAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectingId, setSelectingId] = useState<number | null>(null);
  const [originalDefaultId, setOriginalDefaultId] = useState<number | null>(
    null,
  );

  const loadAddresses = useCallback(async (isActive: () => boolean) => {
    setError(null);

    try {
      const [data, originalId] = await Promise.all([
        getAddresses(),
        getOriginalDefaultAddressId(),
      ]);

      if (isActive()) {
        setAddresses(data);
        setOriginalDefaultId(originalId);
      }
    } catch (loadError) {
      if (isActive()) {
        setError(
          getAddressErrorMessage(
            loadError,
            "Não foi possível carregar seus endereços.",
          ),
        );
      }
    } finally {
      if (isActive()) setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      loadAddresses(() => active);

      return () => {
        active = false;
      };
    }, [loadAddresses]),
  );

  useEffect(() => {
    let active = true;

    const unsubscribe = onDefaultAddressRestored(() => {
      loadAddresses(() => active);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [loadAddresses]);

  function reload() {
    setLoading(true);
    return loadAddresses(() => true);
  }

  async function select(id: number) {
    if (selectingId !== null) return;

    setSelectingId(id);
    setError(null);

    try {
      await selectAddress(id);
      await keepSelectedAsDefault();
      await loadAddresses(() => true);
    } catch (selectError) {
      setError(
        getAddressErrorMessage(
          selectError,
          "Não foi possível selecionar o endereço.",
        ),
      );
    } finally {
      setSelectingId(null);
    }
  }

  async function chooseForOrder(id: number): Promise<boolean> {
    if (selectingId !== null) return false;

    setSelectingId(id);
    setError(null);

    try {
      await chooseOrderAddress(id, selectedAddress?.id ?? null);
      return true;
    } catch (selectError) {
      setError(
        getAddressErrorMessage(
          selectError,
          "Não foi possível usar este endereço.",
        ),
      );
      return false;
    } finally {
      setSelectingId(null);
    }
  }

  const selectedAddress = addresses.find((address) => address.selected) ?? null;

  const defaultAddressId = addresses.some(
    (address) => address.id === originalDefaultId,
  )
    ? originalDefaultId
    : (selectedAddress?.id ?? null);

  return {
    addresses,
    selectedAddress,
    defaultAddressId,
    loading,
    error,
    selectingId,
    reload,
    select,
    chooseForOrder,
  };
}
