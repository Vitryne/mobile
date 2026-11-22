import { StyleSheet } from "react-native";
import {
  colors,
  radius,
  spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    padding: 11,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.warning,
    backgroundColor: colors.card,
  },
  container_blocking: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  texts: {
    flex: 1,
    gap: spacing.xs,
  },
  text: {
    fontSize: 11,
    color: colors.text,
  },
  text_blocking: {
    color: colors.danger,
    fontWeight: "600",
  },
});
