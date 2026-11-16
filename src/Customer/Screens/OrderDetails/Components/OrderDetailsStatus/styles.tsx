import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderColor: colors.border,
    borderWidth: 1,
  },

  icon_box: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  icon_delivered: {
    backgroundColor: colors.successSoft,
  },

  icon_canceled: {
    backgroundColor: colors.dangerSoft,
  },

  details: {
    flex: 1,
    gap: 4,
  },

  title: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },

  date: {
    fontSize: 10,
    color: colors.textMuted,
  },

  buy_again: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
  },

  buy_again_text: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.primary,
  },
});
