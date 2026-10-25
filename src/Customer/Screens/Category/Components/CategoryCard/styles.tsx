import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  image: {
    aspectRatio: 0.81,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    overflow: "hidden",
  },

  info: {
    paddingHorizontal: spacing.md - 4,
    paddingTop: 10,
    paddingBottom: spacing.md - 4,
    gap: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  count: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
