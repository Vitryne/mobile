import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  containerDisabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
