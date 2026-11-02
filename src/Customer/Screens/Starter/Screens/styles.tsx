import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  list: {
    flex: 1,
  },
  slide: {},

  image_container: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "55%",
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
    lineHeight: 36,
  },
  title_highlight: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.primary,
    lineHeight: 36,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 21,
  },

  dots_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.textMuted,
    marginRight: spacing.xs,
  },
  dot_active: {
    width: 20,
    backgroundColor: colors.primary,
  },

  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.sm + spacing.xs,
  },
});
