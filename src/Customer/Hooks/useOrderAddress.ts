import { selectAddress } from "@/Customer/Api/address";
import { ApiError } from "@/Shared/Api/apiConfig";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { Platform } from "react-native";

// A API só guarda um endereço selecionado por cliente. Para usar outro só no
// pedido atual, o app seleciona o escolhido e guarda o padrão anterior aqui,
// devolvendo-o ao sair da sacola (ou na próxima abertura, se o app fechar).
const ORIGINAL_DEFAULT_KEY = "originalDefaultAddressId";

const restoreListeners = new Set<() => void>();

export function onDefaultAddressRestored(listener: () => void) {
  restoreListeners.add(listener);

  return () => {
    restoreListeners.delete(listener);
  };
}

async function readOriginalDefault(): Promise<number | null> {
  const value =
    Platform.OS === "web"
      ? localStorage.getItem(ORIGINAL_DEFAULT_KEY)
      : await SecureStore.getItemAsync(ORIGINAL_DEFAULT_KEY);

  const id = Number(value);
  return value && Number.isInteger(id) ? id : null;
}

async function writeOriginalDefault(id: number) {
  if (Platform.OS === "web") {
    localStorage.setItem(ORIGINAL_DEFAULT_KEY, String(id));
    return;
  }

  await SecureStore.setItemAsync(ORIGINAL_DEFAULT_KEY, String(id));
}

async function clearOriginalDefault() {
  if (Platform.OS === "web") {
    localStorage.removeItem(ORIGINAL_DEFAULT_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(ORIGINAL_DEFAULT_KEY);
}

export async function getOriginalDefaultAddressId() {
  try {
    return await readOriginalDefault();
  } catch {
    return null;
  }
}

export async function chooseOrderAddress(
  chosenId: number,
  currentSelectedId: number | null,
) {
  const originalId = await getOriginalDefaultAddressId();

  if (originalId === null) {
    if (currentSelectedId === null || chosenId === currentSelectedId) {
      await selectAddress(chosenId);
      return;
    }

    await writeOriginalDefault(currentSelectedId);

    try {
      await selectAddress(chosenId);
    } catch (error) {
      await clearOriginalDefault();
      throw error;
    }
    return;
  }

  await selectAddress(chosenId);

  if (chosenId === originalId) await clearOriginalDefault();
}

export async function keepSelectedAsDefault() {
  try {
    await clearOriginalDefault();
  } catch {
    return;
  }
}

export async function restoreDefaultAddress() {
  const originalId = await getOriginalDefaultAddressId();

  if (originalId === null) return;

  try {
    await selectAddress(originalId);
    await keepSelectedAsDefault();
    restoreListeners.forEach((listener) => listener());
  } catch (error) {
    const isPermanent =
      error instanceof ApiError && [403, 404].includes(error.status);

    if (isPermanent) await keepSelectedAsDefault();
  }
}

export function useRestoreDefaultAddressOnLeave() {
  useEffect(() => {
    return () => {
      restoreDefaultAddress();
    };
  }, []);
}
