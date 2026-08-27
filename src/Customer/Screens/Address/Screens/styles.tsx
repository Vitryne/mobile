import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  footer: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
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
  address_card: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: colors.card,
  },
  address_card_selected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  radio_selected: {
    borderColor: colors.primary,
  },
  radio_dot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  address_title: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  address_text: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  tag: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  tag_default: {
    backgroundColor: colors.primary,
  },
  tag_alert: {
    backgroundColor: colors.danger,
  },
  alert_box: {
    flexDirection: "row",
    gap: spacing.sm,
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  alert_text: {
    flex: 1,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  alert_highlight: {
    color: colors.danger,
    fontWeight: "700",
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
  tempo_title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  tempo_row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },
  tempo_store: {
    fontSize: 14,
    color: colors.textMuted,
  },
  tempo_price: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
});
