import { StyleSheet } from "react-native";
import {
  colors,
  radius,
  spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    overflow: "hidden",
  },

  heading: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },

  list: {
    padding: spacing.sm,
    gap: spacing.sm,
  },

  product_row: {
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
    padding: spacing.xs,
  },

  product_image: {
    width: 62,
    height: 72,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
  },

  product_info: {
    flex: 1,
    minHeight: 72,
    gap: 5,
  },

  product_name: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },

  product_description: {
    fontSize: 11,
    color: colors.textMuted,
  },

  product_price: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
    textAlign: "right",
    marginTop: "auto",
  },
});
