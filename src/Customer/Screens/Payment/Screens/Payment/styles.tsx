import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  footer: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  add_btn: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
  },
  add_btn_text: {
    color: colors.primary,
    fontWeight: "600",
  },
  summary_title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  summary_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  summary_label: {
    fontSize: 14,
    color: colors.textMuted,
  },
  summary_value: {
    fontSize: 14,
    color: colors.text,
  },
  summary_discount: {
    color: colors.success,
  },
  total_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  total_label: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  total_value: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  button_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
  },
});
