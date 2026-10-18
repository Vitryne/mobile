import { colors, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  gallery: {
    height: 360,
    borderWidth: 1,
    borderColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  sheet: {
    borderWidth: 1,
    borderColor: colors.danger,
    padding: spacing.md,
    gap: spacing.md,
  },
  box: {
    borderWidth: 1,
    borderColor: colors.text,
    alignItems: "center",
    justifyContent: "center",
  },
  box_name: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  store: { height: 64 },
  title_price: { height: 96 },
  sizes: { height: 96 },
  delivery: { height: 72 },
  description: { height: 120 },
  review: { height: 96 },
  footer: {
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  footer_favorite: {
    width: 56,
    height: 56,
  },
  footer_add: {
    flex: 1,
    height: 56,
  },
});