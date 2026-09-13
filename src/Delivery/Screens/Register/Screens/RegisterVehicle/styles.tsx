import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll_content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: 130,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.lg,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  section_label: {
    fontSize: 13,
    color: colors.text,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  vehicle_row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  vehicle_card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.card,
  },
  vehicle_card_selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  vehicle_label: {
    fontSize: 13,
    color: colors.text,
    marginTop: spacing.xs,
  },
  vehicle_label_selected: {
    color: colors.primary,
    fontWeight: "600",
  },
  fields_wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: spacing.lg,
    marginTop: spacing.lg,
  },
  field_full: {
    width: "100%",
  },
  field_half: {
    width: "48%",
  },
  field_wide: {
    width: "64%",
  },
  field_narrow: {
    width: "32%",
  },
  input_label: {
    fontSize: 12,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  required_mark: {
    color: colors.danger,
  },
  input: {
    height: 48,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    fontSize: 14,
    color: colors.text,
  },
  option_row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  option_button: {
    flex: 1,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.card,
  },
  option_button_selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  option_label: {
    fontSize: 14,
    color: colors.text,
  },
  option_label_selected: {
    color: colors.primary,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
  },
});
