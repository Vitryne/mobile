import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll_content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 90,
    paddingBottom: 140,
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
  password_hint: {
    marginTop: 6,
    fontSize: 11,
    color: "#9A9A9A",
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
});