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
    backgroundColor: "rgba(0, 0, 0, 0.32)",
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
  },

  container: {
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 34,
    gap: spacing.sm,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },

  description: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 12,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  cancel_button: {
    flex: 1,
    height: 43,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  cancel_text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },

  confirm_button: {
    flex: 1,
    height: 43,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },

  confirm_text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.white,
  },
});
