import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

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
  button_wrapper: {
    marginTop: spacing.sm,
  },
});
