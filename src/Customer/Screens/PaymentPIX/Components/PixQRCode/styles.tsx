import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  card: {
    width: 206,
    height: 206,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 22,
    elevation: 3,
    shadowColor: colors.text,
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  expired_content: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },

  expired_icon_circle: {
    height: 58,
    width: 58,
    borderRadius: radius.full,
    backgroundColor: "#FBE7EC",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 9,
  },

  expired_text: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "700",
  },
});
