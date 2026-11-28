export type CardBrand = "visa" | "mastercard" | "other";

export type PaymentCardField =
  "number" | "holderName" | "expiry" | "cvv" | "cpf";

export type PaymentCardValues = Record<PaymentCardField, string>;

export type PaymentCardErrors = Partial<Record<PaymentCardField, string>>;

export type PaymentCardTouched = Partial<Record<PaymentCardField, boolean>>;

export type FieldStatus = "idle" | "valid" | "error";

export type PaymentCardPreview = {
  brand: CardBrand;
  maskedNumber: string;
  holderName: string;
  expiry: string;
};
