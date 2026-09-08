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
    paddingTop: 130,
    paddingBottom: 140,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#9A9A9A",
  },
  documents_list: {
    marginTop: 24,
    gap: 12,
  },
  info_box: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    backgroundColor: colors.primarySoft,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  info_box_text: {
    flex: 1,
    fontSize: 12,
    color: colors.primary,
    lineHeight: 17,
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