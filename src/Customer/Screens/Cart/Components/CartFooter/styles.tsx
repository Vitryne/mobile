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
  button: {
    minHeight: 46,
    marginTop: spacing.sm,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 9,
    elevation: 3,
  },
  button_text: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 13,
  },
});
