import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // --- Image area ---
  image_container: {
    width: "100%",
    height: 320,
    backgroundColor: "#c6c6c6", // verde sálvia do produto — intencional, não no design system
    position: "relative",
  },
  product_image: {
    width: "100%",
    height: "100%",
  },
  badge_discount: {
    position: "absolute",
    top: spacing.md,
    alignSelf: "center",
    backgroundColor: colors.danger,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
  },
  badge_discount_text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  icon_top_left: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  icon_top_right: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    flexDirection: "row",
    gap: spacing.sm,
  },
  icon_circle: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  // --- Info card ---
  info_card: {
    flex: 1,
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.lg + spacing.sm, // 24
    borderTopRightRadius: radius.lg + spacing.sm,
    marginTop: -(radius.lg + spacing.sm),
    paddingHorizontal: spacing.md + spacing.xs, // 20
    paddingTop: spacing.md + spacing.xs,
  },

  // Store row
  store_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md - spacing.xs, // 12
  },
  store_left: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  store_icon_box: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  store_name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  store_meta: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  store_link: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },

  // Product name
  product_name: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 30,
    marginBottom: spacing.sm + 2,
  },

  // Price row
  price_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm + 2,
    marginBottom: spacing.md + 2,
    flexWrap: "wrap",
  },
  price_original: {
    fontSize: 14,
    color: colors.textMuted,
    textDecorationLine: "line-through",
  },
  price_new: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
  },
  price_saving: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.danger,
    textTransform: "uppercase",
  },

  // Size
  size_label: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md - spacing.xs, // 12
  },
  size_row: {
    flexDirection: "row",
    gap: spacing.sm + 2,
    marginBottom: spacing.md - spacing.xs,
  },
  size_option: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  size_option_selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  size_option_disabled: {
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  size_text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
  },
  size_text_selected: {
    color: colors.primary,
    fontWeight: "700",
  },
  size_text_disabled: {
    color: colors.border,
    textDecorationLine: "line-through",
  },

  // Stock warning
  stock_warning: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + 2,
    backgroundColor: "#FFFBEB", // amarelo suave — cor semântica de aviso, não no design system
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md - spacing.xs,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md + 2,
  },
  stock_warning_text: {
    fontSize: 12,
    color: "#B7791F", // texto de aviso — par intencional do fundo #FFFBEB
    fontWeight: "500",
  },

  // Description
  description_label: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs + 2,
  },
  description_text: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 20,
  },

  // Bottom bar
  bottom_bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md + spacing.xs,
    paddingVertical: spacing.md - spacing.xs,
    paddingBottom: spacing.lg + spacing.xs,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md - spacing.xs,
  },
  wishlist_btn: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  add_to_cart_btn: {
    flex: 1,
    height: 50,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  add_to_cart_text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
