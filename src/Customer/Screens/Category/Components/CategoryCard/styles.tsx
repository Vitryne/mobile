import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 190,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
  },

  info: {
    height: 52,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.sm,
    justifyContent: "center",
    gap: 2,
  },

  name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },

  count: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
