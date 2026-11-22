import { StyleSheet } from "react-native";

import {
  colors,
  radius,
  spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const SCREEN_PADDING = 22;
export const GRID_GAP = 16;
export const GRID_ROW_GAP = 20;

const SEARCH_HEIGHT = 62;

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
    paddingTop: SEARCH_HEIGHT,
    paddingBottom: spacing.lg,
    flexGrow: 1,
  },

  search_area: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: SEARCH_HEIGHT,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 4,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },

  search_button: {
    height: 48,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    gap: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  search_placeholder: {
    flex: 1,
    fontSize: 13,
    color: colors.textMuted,
  },

  chip_list: {
    flexGrow: 0,
    marginBottom: 0,
  },

  chip_list_content: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },

  chip: {
    height: 42,
    minWidth: 90,
    paddingHorizontal: 18,
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
    textAlign: "center",
  },

  chip_text_selected: {
    fontWeight: "600",
    color: colors.white,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: GRID_GAP,
    rowGap: GRID_ROW_GAP,
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 10,
    marginBottom: 12,
  },

  feedback_container: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 28,
    alignItems: "center",
    gap: 8,
  },

  feedback_title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },

  feedback_description: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
  },

  feedback_action: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 8,
  },

  results_section: {
    flex: 1,
    paddingTop: 10,
  },

  results_header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 16,
    gap: 12,
  },

  back_button: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },

  results_heading: {
    flex: 1,
    gap: 3,
  },

  results_title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },

  results_count: {
    fontSize: 12,
    color: colors.textMuted,
  },

  product_grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: GRID_GAP,
    rowGap: 16,
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 24,
  },

  trend_banner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    marginTop: spacing.lg,
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
