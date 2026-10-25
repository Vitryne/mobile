import { colors, radius } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  reference: {
    fontSize: 13,
    color: colors.textMuted,
  },
  price_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  price: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
  },
  price_cents: {
    fontSize: 16,
    fontWeight: "700",
  },
  old_price: {
    fontSize: 13,
    color: colors.textMuted,
    textDecorationLine: "line-through",
  },
  discount: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
  },
  discount_text: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  installments: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
