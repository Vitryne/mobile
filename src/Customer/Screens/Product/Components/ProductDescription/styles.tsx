import { colors } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
});
