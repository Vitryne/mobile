import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  step: {
    width: 22,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#D9D9D9",
  },
  step_active: {
    backgroundColor: colors.primary,
  },
});
