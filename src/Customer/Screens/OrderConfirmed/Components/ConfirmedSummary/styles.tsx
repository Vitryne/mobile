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
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    alignSelf: "center",
  },

  info: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
    gap: 3,
  },

  label: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.primary,
  },

  value: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },

  divider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
});
