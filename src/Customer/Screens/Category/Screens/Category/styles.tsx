import { StyleSheet } from "react-native";
import { SEARCH_AREA_HEIGHT } from "../../../../../Customer/Hooks/useRevealOnScrollUp";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const SCREEN_PADDING = 22;
export const GRID_GAP = 14;

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
  scroll_content: {
    paddingTop: SEARCH_AREA_HEIGHT,
    paddingBottom: 20,
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

  chip_list: {
    flexGrow: 0,
  },
  chip_list_content: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 10,
  },
  chip: {
    height: 34,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  chip_selected: {
    borderColor: colors.text,
    backgroundColor: colors.text,
  },
  chip_text: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text,
  },
  chip_text_selected: {
    fontWeight: "600",
    color: colors.white,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GRID_GAP,
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 20,
  },

  trend_banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    marginTop: 20,
    marginHorizontal: SCREEN_PADDING,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: "#F4ECDD",
  },
  trend_texts: {
    flex: 1,
    gap: 2,
  },
  trend_title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  trend_subtitle: {
    fontSize: 12,
    color: colors.textMuted,
  },
  trend_button: {
    height: 32,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  trend_button_text: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
});
