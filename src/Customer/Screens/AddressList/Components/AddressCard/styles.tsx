import {
  colors,
  commonStyles,
  radius,
  spacing,
} from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    ...commonStyles.card,
    ...commonStyles.row,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  container_in_use: {
    borderColor: colors.primary,
  },
  icon_box: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  title_row: {
    ...commonStyles.row,
    gap: spacing.sm,
  },
  title: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  details: {
    fontSize: 12,
    color: colors.textMuted,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox_checked: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  edit_text: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  badge: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.full,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  badge_text: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
    textTransform: "uppercase",
  },
});
