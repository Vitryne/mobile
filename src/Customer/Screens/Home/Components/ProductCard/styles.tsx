import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  image: {
    aspectRatio: 0.9,
    padding: spacing.sm,
    borderRadius: radius.lg,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  discount_badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  discount_text: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.white,
  },
  heart_button: {
    width: 30,
    height: 30,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  info: {
    paddingHorizontal: 6,
    paddingTop: spacing.sm,
    paddingBottom: 6,
    gap: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  store: {
    fontSize: 11,
    color: colors.textMuted,
  },
  price_row: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: spacing.xs,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  old_price: {
    fontSize: 11,
    color: colors.textMuted,
    textDecorationLine: "line-through",
  },
});
