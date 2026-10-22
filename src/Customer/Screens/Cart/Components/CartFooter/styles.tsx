import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    elevation: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 13,
    color: colors.textMuted,
  },
  value: {
    fontSize: 13,
    color: colors.text,
  },
  total_label: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  total_value: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: 14,
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  button_text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});
