import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../../Styles/commonStyles";

export const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
    alignItems: "center",
    gap: spacing.md,
  },
  expiraLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  timer: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.danger,
  },
  qr: {
    width: 220,
    height: 220,
    backgroundColor: colors.border,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  qrText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  total_label: {
    fontSize: 13,
    color: colors.textMuted,
  },
  total_value: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
  },
  code_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.sm,
    width: "100%",
  },
  code: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
  },
  copy_btn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
  },
  copy_text: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 13,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});
