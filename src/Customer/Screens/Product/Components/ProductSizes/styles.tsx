import { colors } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  link: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  sizes_row: {
    flexDirection: "row",
    gap: 10,
  },
  size_button: {
    width: 48,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  size_button_selected: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  size_button_disabled: {
    opacity: 0.4,
  },
  size_text: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  size_text_selected: {
    color: colors.white,
  },
  warning_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  warning_text: {
    fontSize: 13,
    color: colors.warning,
  },
});
