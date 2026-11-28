import { StyleSheet } from "react-native";
import {
  colors,
  commonStyles,
  radius,
  spacing,
} from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
  },

  scroll: {
    flex: 1,
  },

  content: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.sm,
  },

  info_card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 12,
  },

  info_icon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  info_texts: {
    flex: 1,
    gap: 4,
  },

  info_title: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },

  info_description: {
    fontSize: 11,
    color: colors.textMuted,
  },

  totals_card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 12,
  },

  total_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  total_label: {
    fontSize: 12,
    color: colors.textMuted,
  },

  total_value: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
  },

  discount_text: {
    fontSize: 12,
    color: colors.success,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
  },

  final_label: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textMuted,
  },

  final_value: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },

  actions: {
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xs,
  },

  primary_button: {
    minHeight: 44,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },

  primary_button_text: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.white,
  },

  secondary_button: {
    minHeight: 44,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },

  secondary_button_text: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },

  empty_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },

  empty_text: {
    fontSize: 15,
    color: colors.textMuted,
  },

  empty_link: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },

  message_text: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    paddingHorizontal: spacing.lg,
  },

  retry_button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
  },

  retry_text: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
});
