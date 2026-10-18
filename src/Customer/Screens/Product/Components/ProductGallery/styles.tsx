import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    height: 380,
    backgroundColor: colors.border,
  },
  main_image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  thumbs: {
    position: "absolute",
    left: spacing.md,
    bottom: 40,
    gap: spacing.sm,
  },
  thumb: {
    width: 36,
    height: 40,
    borderRadius: radius.sm,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  thumb_selected: {
    borderColor: colors.white,
  },
  thumb_image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});