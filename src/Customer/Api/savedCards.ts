import type { CardBrand } from "@/Customer/Types/paymentCard";
import type { NewSavedCard, SavedCard } from "@/Customer/Types/savedCard";
import { getValidSession } from "@/Shared/Api/tokenStorage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const STORAGE_KEY_PREFIX = "savedCards";

const BRANDS: CardBrand[] = ["visa", "mastercard", "other"];

const MOCK_CARDS: SavedCard[] = [
  {
    id: "mock-visa-4421",
    brand: "visa",
    lastFour: "4421",
    holderName: "MARINA DE SILVA",
    expiry: "08/29",
    isMain: true,
  },
];

async function getStorageKey() {
  const session = await getValidSession();
  const owner = (session?.email || "anonymous").replace(
    /[^A-Za-z0-9._-]/g,
    "_",
  );

  return `${STORAGE_KEY_PREFIX}.${owner}`;
}

function sanitizeCard(value: unknown): SavedCard | null {
  if (!value || typeof value !== "object") return null;

  const card = value as Record<string, unknown>;

  if (
    typeof card.id !== "string" ||
    typeof card.lastFour !== "string" ||
    typeof card.holderName !== "string" ||
    typeof card.expiry !== "string"
  ) {
    return null;
  }

  return {
    id: card.id,
    brand: BRANDS.includes(card.brand as CardBrand)
      ? (card.brand as CardBrand)
      : "other",
    lastFour: card.lastFour.replace(/\D/g, "").slice(-4),
    holderName: card.holderName,
    expiry: card.expiry,
    isMain: card.isMain === true,
  };
}

function ensureMainCard(cards: SavedCard[]): SavedCard[] {
  if (cards.length === 0 || cards.some((card) => card.isMain)) return cards;

  return cards.map((card, index) => ({ ...card, isMain: index === 0 }));
}

async function readCards(): Promise<SavedCard[]> {
  const key = await getStorageKey();

  const raw =
    Platform.OS === "web"
      ? localStorage.getItem(key)
      : await SecureStore.getItemAsync(key);

  if (raw === null) return MOCK_CARDS;
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return ensureMainCard(
      parsed
        .map(sanitizeCard)
        .filter((card): card is SavedCard => card !== null),
    );
  } catch {
    return [];
  }
}

async function writeCards(cards: SavedCard[]) {
  const key = await getStorageKey();
  const value = JSON.stringify(cards.map(sanitizeCard).filter(Boolean));

  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

async function getSavedCards(): Promise<SavedCard[]> {
  return readCards();
}

async function saveCard(card: NewSavedCard): Promise<SavedCard> {
  const cards = await readCards();

  const saved: SavedCard = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    brand: card.brand,
    lastFour: card.lastFour.replace(/\D/g, "").slice(-4),
    holderName: card.holderName.trim(),
    expiry: card.expiry,
    isMain: cards.length === 0,
  };

  await writeCards([...cards, saved]);
  return saved;
}

async function removeCard(id: string): Promise<SavedCard[]> {
  const cards = await readCards();
  const remaining = ensureMainCard(cards.filter((card) => card.id !== id));

  await writeCards(remaining);
  return remaining;
}

async function setMainCard(id: string): Promise<SavedCard[]> {
  const cards = await readCards();

  if (!cards.some((card) => card.id === id)) return cards;

  const updated = cards.map((card) => ({ ...card, isMain: card.id === id }));

  await writeCards(updated);
  return updated;
}

export { getSavedCards, removeCard, saveCard, setMainCard };
