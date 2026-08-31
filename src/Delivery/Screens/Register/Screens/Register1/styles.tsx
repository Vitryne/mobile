import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 30,
  },
  box_title: {
    backgroundColor: colors.primarySoft,
    padding: 2,
    borderRadius: 15,
    flexDirection: "row",
    width: 190,
    alignItems: "center",
    justifyContent: "center"
  },
  box_title_text: {
    marginTop: 4,
    fontSize: 13,
    color: colors.primary,
    fontWeight: "bold"
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#9A9A9A",
  },
  passwordHint: {
    marginTop: 6,
    fontSize: 11,
    color: "#9A9A9A",
  },
  footer: {
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
});
