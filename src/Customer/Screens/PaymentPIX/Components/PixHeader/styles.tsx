import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 10,
    gap: 16,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
});
