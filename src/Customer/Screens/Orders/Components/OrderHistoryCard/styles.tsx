import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 78,
  },

  image: {
    width: 48,
    height: 54,
    borderRadius: radius.md,
    backgroundColor: colors.border,
  },

  details: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },

  meta: {
    fontSize: 10,
    color: colors.textMuted,
  },

  product_name: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },

  subtotal: {
    fontSize: 10,
    color: colors.textMuted,
  },

  status_badge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    flexShrink: 0,
  },

  status_text: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.primary,
  },

  status_delivered: {
    backgroundColor: colors.successSoft,
  },

  status_text_delivered: {
    color: colors.success,
  },

  status_canceled: {
    backgroundColor: colors.dangerSoft,
  },

  status_text_canceled: {
    color: colors.danger,
  },
});
