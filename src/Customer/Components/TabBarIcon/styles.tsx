import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const TAB_BAR_ICON_SIZE = 20;
export const TAB_BAR_PILL_WIDTH = 56;
export const TAB_BAR_PILL_HEIGHT = 28;
export const TAB_BAR_LABEL_FONT_SIZE = 12;
export const TAB_BAR_LABEL_LINE_HEIGHT = 16;
export const TAB_BAR_MAX_FONT_SCALE = 1.2;
export const TAB_BAR_PADDING_TOP = 6;
export const TAB_BAR_MIN_BOTTOM_PADDING = 12;
const TAB_BAR_BORDER_WIDTH = 1;
// Padding vertical que o botão de cada aba já recebe da lib (tabVerticalUiKit).
const TAB_BAR_ITEM_PADDING = 5;

export function getTabBarHeight(fontScale: number, bottomPadding: number) {
  const scale = Math.min(Math.max(fontScale, 1), TAB_BAR_MAX_FONT_SCALE);
  const labelHeight = Math.ceil(TAB_BAR_LABEL_LINE_HEIGHT * scale);

  return (
    TAB_BAR_BORDER_WIDTH +
    TAB_BAR_PADDING_TOP +
    TAB_BAR_ITEM_PADDING * 2 +
    TAB_BAR_PILL_HEIGHT +
    spacing.xs +
    labelHeight +
    bottomPadding
  );
}

export const styles = StyleSheet.create({
  tab_bar: {
    backgroundColor: colors.white,
    borderTopWidth: TAB_BAR_BORDER_WIDTH,
    borderTopColor: colors.border,
    paddingTop: TAB_BAR_PADDING_TOP,
    elevation: 0,
    shadowOpacity: 0,
  },
  tab_item: {
    padding: 0,
  },
  tab_icon: {
    width: TAB_BAR_PILL_WIDTH,
    height: TAB_BAR_PILL_HEIGHT,
  },

  pill: {
    width: TAB_BAR_PILL_WIDTH,
    height: TAB_BAR_PILL_HEIGHT,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  pill_active: {
    backgroundColor: colors.primarySoft,
  },

  label: {
    marginTop: spacing.xs,
    fontSize: TAB_BAR_LABEL_FONT_SIZE,
    lineHeight: TAB_BAR_LABEL_LINE_HEIGHT,
    fontWeight: "400",
    textAlign: "center",
    includeFontPadding: false,
  },
  label_active: {
    fontWeight: "700",
  },
});
