import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    marginRight: spacing.sm,
  },
  store_name: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  delivery_info: {
    fontSize: 11,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
