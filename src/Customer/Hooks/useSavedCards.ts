import {
  getSavedCards,
  removeCard,
  setMainCard,
} from "@/Customer/Api/savedCards";
import type { SavedCard } from "@/Customer/Types/savedCard";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export function useSavedCards() {
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCards = useCallback(async (isActive: () => boolean) => {
    setError(null);

    try {
      const data = await getSavedCards();

      if (isActive()) setCards(data);
    } catch {
      if (isActive()) setError("Não foi possível carregar seus cartões.");
    } finally {
      if (isActive()) setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      loadCards(() => active);

      return () => {
        active = false;
      };
    }, [loadCards]),
  );

  function reload() {
    setLoading(true);
    return loadCards(() => true);
  }

  async function setMain(id: string) {
    setError(null);

    try {
      setCards(await setMainCard(id));
    } catch {
      setError("Não foi possível definir o cartão principal.");
    }
  }

  async function remove(id: string) {
    setError(null);

    try {
      setCards(await removeCard(id));
    } catch {
      setError("Não foi possível remover o cartão.");
    }
  }

  return { cards, loading, error, reload, setMain, remove };
}
