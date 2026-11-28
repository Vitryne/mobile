import {
  colors,
  commonStyles,
  radius,
  spacing,
} from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
  },
  scroll_content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  field_error: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.danger,
  },
  error_text: {
    marginTop: spacing.md,
    fontSize: 13,
    color: colors.danger,
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  message_text: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
  },
  retry_button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  retry_text: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
  footer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  actions_row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  actions_main: {
    flex: 1,
  },
  delete_button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  delete_button_pressed: {
    opacity: 0.8,
  },
  delete_text: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.danger,
  },
});
