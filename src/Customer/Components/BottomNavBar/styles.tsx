import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 10,
    paddingHorizontal: spacing.sm,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
  },

  icon_bubble: {
    width: 44,
    height: 30,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  icon_bubble_active: {
    backgroundColor: colors.primarySoft,
  },

  label: {
    fontSize: 11,
    fontWeight: "500",
    color: colors.textMuted,
  },
  label_active: {
    fontWeight: "700",
    color: colors.primary,
  },
});
