import { StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  safe_area: {
    backgroundColor: "#801DB7",
  },

  container: {
    backgroundColor: "#801DB7",
    paddingHorizontal: spacing.md,
    paddingTop: 22,
    paddingBottom: 34,
  },

  title: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 20,
  },

  user_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: "#EEDAFF",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar_text: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },

  user_info: {
    flex: 1,
    alignItems: "flex-start",
    gap: 3,
  },

  user_name: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },

  user_email: {
    color: "#F3E8FF",
    fontSize: 11,
  },

  edit_button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.white,
    borderRadius: radius.full,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginTop: 2,
  },

  edit_button_text: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "700",
  },
});
