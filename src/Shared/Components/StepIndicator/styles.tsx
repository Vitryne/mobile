import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  step: {
    width: 22,
    height: 3,
    borderRadius: radius.full,
    backgroundColor: colors.border,
  },
  step_active: {
    backgroundColor: colors.primary,
  },
});
