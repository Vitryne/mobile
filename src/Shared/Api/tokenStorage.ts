import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "accessToken";

// Margem para não usar um token que vence logo em seguida
const EXPIRY_MARGIN_MS = 60 * 1000;

export type StoredSession = {
  token: string;
  email: string;
  role: string;
  expiresAt: number;
};

async function saveToken(token: string) {
  if (Platform.OS === "web") {
    localStorage.setItem(TOKEN_KEY, token);
    return;
  }

  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

async function getToken() {
  if (Platform.OS === "web") {
    return localStorage.getItem(TOKEN_KEY);
  }

  return SecureStore.getItemAsync(TOKEN_KEY);
}

async function clearToken() {
  if (Platform.OS === "web") {
    localStorage.removeItem(TOKEN_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

// Lê os dados (payload) do JWT sem validar a assinatura; quem valida é o back
function decodeTokenPayload(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

// Devolve a sessão salva se o token ainda não venceu; senão apaga o token
async function getValidSession(): Promise<StoredSession | null> {
  const token = await getToken();
  if (!token) return null;

  const payload = decodeTokenPayload(token);
  const exp = typeof payload?.exp === "number" ? payload.exp * 1000 : 0;

  if (!payload || exp - EXPIRY_MARGIN_MS <= Date.now()) {
    await clearToken();
    return null;
  }

  return {
    token,
    email: typeof payload.email === "string" ? payload.email : "",
    role: typeof payload.role === "string" ? payload.role : "",
    expiresAt: exp,
  };
}

export { clearToken, getToken, getValidSession, saveToken };
