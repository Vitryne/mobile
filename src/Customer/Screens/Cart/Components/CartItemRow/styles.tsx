import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: spacing.md,
  },
  image: {
    width: 76,
    height: 96,
    borderRadius: radius.md,
    backgroundColor: colors.border,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  size: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  bottom_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.border,
    borderRadius: radius.full,
    padding: spacing.xs,
  },
  stepper_button: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    minWidth: 28,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
});
