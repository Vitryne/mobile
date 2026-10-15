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

  body: {
    flex: 1,
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: SEARCH_AREA_HEIGHT,
    paddingBottom: spacing.lg,
  },

  searchArea: {
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
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    ...softShadow,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    color: colors.text,
    padding: 0,
  },

  horizontalList: {
    flexGrow: 0,
  },
  categoryListContent: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 10,
  },
  categoryItem: {
    width: 68,
    alignItems: "center",
    gap: spacing.sm,
  },
  categoryRing: {
    width: 68,
    height: 68,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: "transparent",
    padding: 3,
  },
  categoryRingSelected: {
    borderColor: colors.primary,
  },
  categoryImage: {
    flex: 1,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textMuted,
  },
  categoryLabelSelected: {
    fontWeight: "700",
    color: colors.text,
  },

  bannerSection: {
    marginTop: SCREEN_PADDING,
    paddingHorizontal: SCREEN_PADDING,
  },
  bannerCard: {
    height: 184,
    borderRadius: 24,
    overflow: "hidden",
  },
  bannerGradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: spacing.md,
  },
  bannerTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.92)",
  },
  bannerTagText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.6,
    color: colors.text,
  },
  bannerTitle: {
    fontSize: 26,
    lineHeight: 31,
    fontWeight: "700",
    color: colors.white,
  },
  bannerFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  bannerFooterSide: {
    flex: 1,
    alignItems: "flex-start",
  },
  bannerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 34,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  bannerButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
  },
  bannerDots: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  bannerDot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  bannerDotActive: {
    width: 16,
    backgroundColor: colors.white,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SCREEN_PADDING,
    marginTop: spacing.xl,
    marginBottom: 14,
  },
  sectionHeaderSpread: {
    justifyContent: "space-between",
  },
  sectionHeaderInline: {
    gap: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },

  storeListContent: {
    paddingHorizontal: SCREEN_PADDING,
    gap: spacing.md,
  },
  storeCard: {
    width: 176,
    padding: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.white,
    ...softShadow,
  },
  storeImage: {
    height: 96,
    padding: spacing.sm,
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "flex-start",
  },
  storeTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  storeTagText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.4,
    color: colors.text,
  },
  storeName: {
    marginTop: spacing.sm,
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  storeMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  storeMetaText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  storeMetaDot: {
    width: 4,
    height: 4,
    borderRadius: radius.full,
    backgroundColor: colors.textMuted,
  },

  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: PRODUCT_GAP,
    paddingHorizontal: SCREEN_PADDING,
  },
  productCard: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: colors.white,
    ...softShadow,
  },
  productImage: {
    aspectRatio: 0.9,
    padding: spacing.sm,
    borderRadius: radius.lg,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  discountBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  discountText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.white,
  },
  heartButton: {
    width: 30,
    height: 30,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  productInfo: {
    paddingHorizontal: 6,
    paddingTop: spacing.sm,
    paddingBottom: 6,
    gap: 2,
  },
  productName: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },
  productStore: {
    fontSize: 11,
    color: colors.textMuted,
  },
  productPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: spacing.xs,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  productOldPrice: {
    fontSize: 11,
    color: colors.textMuted,
    textDecorationLine: "line-through",
  },
});
