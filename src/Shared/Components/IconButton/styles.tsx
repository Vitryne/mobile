import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const ICON_BUTTON_SIZE = 40;

export const styles = StyleSheet.create({
  container: {
    width: ICON_BUTTON_SIZE,
    height: ICON_BUTTON_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.text,
    shadowOpacity: 0.12,
    shadowRadius: spacing.xs,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  pressed: {
    opacity: 0.8,
  },
  badge: {
    position: "absolute",
    top: -spacing.xs,
    right: -spacing.xs,
    minWidth: 18,
    height: 18,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badge_text: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "700",
  },
});
