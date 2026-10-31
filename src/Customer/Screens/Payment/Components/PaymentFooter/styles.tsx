import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 9,
    backgroundColor: "#FAF9F7",
  },
  button: {
    minHeight: 46,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 9,
    elevation: 3,
  },
  text: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 13,
  },
});
