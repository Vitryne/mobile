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
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    padding: spacing.md,
  },

  message: {
    flex: 1,
    fontSize: 12,
    color: colors.primary,
  },
});
