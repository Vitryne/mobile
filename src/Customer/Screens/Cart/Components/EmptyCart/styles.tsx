import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  icon_circle: {
    width: 72,
    height: 72,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 13,
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: spacing.lg,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
    elevation: 4,
  },
  button_text: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
