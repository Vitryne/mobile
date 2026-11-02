import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  field_label: {
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  code_box: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 11,
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    height: 36,
    justifyContent: "center",
  },
  code_text: {
    color: colors.description,
    fontSize: 10,
  },
  disabled_box: {
    opacity: 0.55,
  },
  disabled_text: {
    color: colors.description,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
    height: 41,
    borderRadius: 11,
    marginTop: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  button_text: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  copied_button: {
    backgroundColor: colors.successSoft,
    borderColor: colors.success,
  },
  copied_text: {
    color: colors.success,
  },
});
