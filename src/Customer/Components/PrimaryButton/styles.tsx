import { StyleSheet } from "react-native";
import { colors } from "../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  container_disabled: {
    opacity: 0.4,
  },
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
});
