import { StyleSheet } from "react-native";
import {
  colors,
  radius,
  spacing,
} from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  address_banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.full,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  address_text: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
  },
  address_bold: {
    fontWeight: "700",
  },
  link_text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  coupon_row: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  coupon_text: {
    flex: 1,
    fontSize: 13,
    color: colors.textMuted,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  message_text: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
  },
  error_text: {
    fontSize: 13,
    color: colors.danger,
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
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
