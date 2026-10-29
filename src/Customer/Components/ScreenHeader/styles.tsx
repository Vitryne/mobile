import { StyleSheet } from "react-native";
import { colors } from "../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
    color: colors.text,
  },
});
