import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

const REMOVE_BUTTON_SIZE = 36;

export const styles = StyleSheet.create({
  wrapper: {
    marginBottom: REMOVE_BUTTON_SIZE / 2,
  },
  remove_button: {
    position: "absolute",
    right: -spacing.xs,
    bottom: -REMOVE_BUTTON_SIZE / 2,
    width: REMOVE_BUTTON_SIZE,
    height: REMOVE_BUTTON_SIZE,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: colors.text,
    shadowOpacity: 0.15,
    shadowRadius: spacing.xs,
    shadowOffset: { width: 0, height: 2 },
  },
  remove_button_pressed: {
    opacity: 0.85,
  },
});
