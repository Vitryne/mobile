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
    ...commonStyles.scroll_content,
    paddingTop: spacing.sm,
    gap: spacing.lg,
  },
  loading: {
    paddingVertical: spacing.xl,
    alignItems: "center",
  },
  card_list: {
    gap: spacing.md,
  },
  empty_text: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    paddingVertical: spacing.md,
  },
  error_text: {
    fontSize: 13,
    color: colors.danger,
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  add_button: {
    ...commonStyles.row,
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  add_button_pressed: {
    opacity: 0.8,
  },
  add_button_text: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  method_row: {
    ...commonStyles.card,
    ...commonStyles.row,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  method_icon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  method_info: {
    flex: 1,
    gap: 2,
  },
  method_title: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  method_description: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
