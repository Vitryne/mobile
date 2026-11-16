import { StyleSheet } from "react-native";
import { colors, radius } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  menu_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 68,
  },

  menu_row_border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  icon_container: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    backgroundColor: "#F2F1F0",
    alignItems: "center",
    justifyContent: "center",
  },

  icon_container_danger: {
    backgroundColor: colors.dangerSoft,
  },

  text_container: {
    flex: 1,
    gap: 4,
  },

  option_title: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },

  option_title_danger: {
    color: colors.danger,
  },

  option_description: {
    fontSize: 10,
    color: colors.textMuted,
  },
});
