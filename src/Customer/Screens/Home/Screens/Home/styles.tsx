import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const SCREEN_PADDING = 22;
export const PRODUCT_GAP = 12;
export const SEARCH_AREA_HEIGHT = 62;

const softShadow = {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
} as const;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  location_block: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexShrink: 1,
  },
  location_label: {
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: colors.textMuted,
  },
  location_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  location_text: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  header_actions: {
    flexDirection: "row",
    gap: 10,
  },
  icon_button: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    ...softShadow,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badge_text: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.white,
  },

  body: {
    flex: 1,
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
  },
  scroll_content: {
    paddingTop: SEARCH_AREA_HEIGHT,
    paddingBottom: spacing.lg,
  },

  search_area: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: SEARCH_AREA_HEIGHT,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 4,
    paddingBottom: 14,
    backgroundColor: colors.background,
  },
  search_bar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    ...softShadow,
  },
  search_input: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    color: colors.text,
    padding: 0,
  },

  horizontal_list: {
    flexGrow: 0,
  },
  category_list_content: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 10,
  },
  category_item: {
    width: 68,
    alignItems: "center",
    gap: spacing.sm,
  },
  category_ring: {
    width: 68,
    height: 68,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: "transparent",
    padding: 3,
  },
  category_ring_selected: {
    borderColor: colors.primary,
  },
  category_image: {
    flex: 1,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  category_label: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textMuted,
  },
  category_label_selected: {
    fontWeight: "700",
    color: colors.text,
  },

  banner_section: {
    marginTop: SCREEN_PADDING,
    paddingHorizontal: SCREEN_PADDING,
  },
  banner_card: {
    height: 184,
    borderRadius: 24,
    overflow: "hidden",
  },
  banner_gradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: spacing.md,
  },
  banner_tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  banner_tag_text: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.6,
    color: colors.text,
  },
  banner_title: {
    fontSize: 26,
    lineHeight: 31,
    fontWeight: "700",
    color: colors.white,
  },
  banner_footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  banner_footer_side: {
    flex: 1,
    alignItems: "flex-start",
  },
  banner_button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 34,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  banner_button_text: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
  },
  banner_dots: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  banner_dot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  banner_dot_active: {
    width: 16,
    backgroundColor: colors.white,
  },

  section_header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SCREEN_PADDING,
    marginTop: spacing.xl,
    marginBottom: 14,
  },
  section_header_spread: {
    justifyContent: "space-between",
  },
  section_header_inline: {
    gap: 20,
  },
  section_title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  section_link: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },

  store_list_content: {
    paddingHorizontal: SCREEN_PADDING,
    gap: spacing.md,
  },
  store_card: {
    width: 176,
    padding: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.white,
    ...softShadow,
  },
  store_image: {
    height: 96,
    padding: spacing.sm,
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "flex-start",
  },
  store_tag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  store_tag_text: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.4,
    color: colors.text,
  },
  store_name: {
    marginTop: spacing.sm,
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  store_meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  store_meta_text: {
    fontSize: 11,
    color: colors.textMuted,
  },
  store_meta_dot: {
    width: 4,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.textMuted,
  },

  product_grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: PRODUCT_GAP,
    paddingHorizontal: SCREEN_PADDING,
  },
  product_card: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: colors.white,
    ...softShadow,
  },
  product_image: {
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
  product_info: {
    paddingHorizontal: 6,
    paddingTop: spacing.sm,
    paddingBottom: 6,
    gap: 2,
  },
  product_name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  product_store: {
    fontSize: 11,
    color: colors.textMuted,
  },
  product_price_row: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: spacing.xs,
  },
  product_price: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  product_old_price: {
    fontSize: 11,
    color: colors.textMuted,
    textDecorationLine: "line-through",
  },
});
