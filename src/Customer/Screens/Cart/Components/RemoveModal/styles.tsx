import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.lg,
  },
  header_text: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.md,
  },
  cancel_button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  cancel_text: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  confirm_button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },
  confirm_text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});
