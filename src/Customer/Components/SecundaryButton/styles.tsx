import { StyleSheet } from "react-native";
import { colors } from "../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5d9f7",
  },
  container_disabled: {
    opacity: 0.4,
  },
  label: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "700",
  },
});
