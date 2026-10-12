import { StyleSheet } from "react-native";
import { colors } from "../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
  },
  required: {
    color: colors.primary,
  },
  input_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 52,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },
  input_wrapper_focused: {
    borderColor: colors.primary,
  },
  input_wrapper_valid: {
    borderColor: "#22C55E",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    padding: 0,
  },
  helper_text: {
    marginTop: 6,
    fontSize: 12,
    color: "#9A9A9A",
  },
});
