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
  list_content: {
    ...commonStyles.scroll_content,
    paddingTop: spacing.sm,
  },
  error_text: {
    fontSize: 13,
    color: colors.danger,
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  empty_state: {
    ...commonStyles.card,
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  empty_title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  add_button: {
    ...commonStyles.button,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  add_button_text: {
    ...commonStyles.button_text,
    color: colors.primary,
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
    ...commonStyles.button,
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  retry_text: {
    ...commonStyles.button_text,
    fontSize: 14,
  },
});
