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
    ...StyleSheet.absoluteFillObject,
  },

  container: {
    width: "100%",
    minHeight: 350,
    backgroundColor: colors.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: spacing.lg,
    paddingTop: 10,
    paddingBottom: 48,
  },

  handle: {
    width: 44,
    height: 4,
    borderRadius: radius.full,
    alignSelf: "center",
    backgroundColor: colors.border,
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 44,
  },

  avatar_wrapper: {
    position: "relative",
  },

  avatar: {
    width: 86,
    height: 86,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
  },

  avatar_text: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "600",
  },

  edit_icon: {
    position: "absolute",
    bottom: -2,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },

  change_photo_button: {
    marginTop: 18,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },

  change_photo_text: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },

  actions: {
    flexDirection: "row",
    gap: 14,
  },

  cancel_button: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  cancel_text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },

  save_button: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },

  save_text: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.white,
  },
});
