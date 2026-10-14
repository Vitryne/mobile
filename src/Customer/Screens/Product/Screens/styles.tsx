import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  gallery: {
    height: 360,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  top_buttons: {
    position: "absolute",
    top: spacing.xl,
    left: spacing.md,
    right: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  top_buttons_right: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  top_button: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  sheet: {
    marginTop: -spacing.lg,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  box: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  box_name: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textMuted,
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
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
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