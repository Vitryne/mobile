import { colors, spacing } from "@/Shared/Styles/commonStyles";
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
});
