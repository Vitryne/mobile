import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: 25,
  },

  success_circle_outer: {
    width: 110,
    height: 110,
    borderRadius: radius.full,
    backgroundColor: "#D5F5E3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },

  success_circle_inner: {
    width: 82,
    height: 82,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.md,
  },

  description: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 19,
    maxWidth: 315,
    marginBottom: spacing.xl,
  },

  actions: {
    width: "100%",
    maxWidth: 300,
    gap: spacing.md,
    marginTop: spacing.xl,
  },

  primary_button: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    elevation: 4,
  },

  primary_button_text: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },

  secondary_button: {
    height: 46,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },

  secondary_button_text: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});
