import type { CardBrand } from "./paymentCard";

export type SavedCard = {
  id: string;
  brand: CardBrand;
  lastFour: string;
  holderName: string;
  expiry: string;
  isMain: boolean;
};

export type NewSavedCard = Omit<SavedCard, "id" | "isMain">;
