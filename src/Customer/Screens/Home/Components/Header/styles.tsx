import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

const SCREEN_PADDING = 22;

export const styles = StyleSheet.create({
  container: {
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

  actions: {
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
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
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
});
