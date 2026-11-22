import { StyleSheet } from "react-native";
import {
  colors,
  radius,
  spacing,
} from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAF9F7",
  },
  content: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: 16,
    paddingBottom: 7,
    gap: 19,
  },
  flexSections: {
    flex: 1,
    minHeight: 0,
    gap: 17,
  },
  paymentArea: {
    height: 218,
    flexShrink: 1,
    minHeight: 0,
  },
  summaryArea: {
    flex: 1,
    minHeight: 0,
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
