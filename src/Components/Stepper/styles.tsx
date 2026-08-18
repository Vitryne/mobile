import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../Styles/commonStyles";

export const styles = StyleSheet.create({
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  step_badge: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },
  step_badge_active: {
    backgroundColor: colors.primary,
  },
  step_badge_idle: {
    backgroundColor: colors.border,
  },
  step_badge_text: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
  },
  step_label: {
    fontSize: 12,
    color: colors.textMuted,
  },
  step_label_active: {
    color: colors.text,
    fontWeight: "600",
  },
  step_line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xs,
  },
  step_line_active: {
    backgroundColor: colors.primary,
  },
});
