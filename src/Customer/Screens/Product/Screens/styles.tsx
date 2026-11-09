import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sheet: {
    marginTop: -24,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.md,
    gap: spacing.lg,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.md,
  },
  error_text: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
  },
  retry_button: {
    height: 44,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  retry_text: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
  back_text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
});
