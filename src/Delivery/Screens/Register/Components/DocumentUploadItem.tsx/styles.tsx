import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  /* borda avermelhada só quando o documento foi recusado */
  card_invalid: {
    borderColor: colors.danger,
  },
  icon_box: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  status_text: {
    marginTop: 2,
    fontSize: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
  },
  button_text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.white,
  },
});