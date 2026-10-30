import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
  },
  change: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 11,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9E5ED",
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    padding: 11,
    minHeight: 58,
    gap: 10,
  },
  icon: {
    height: 33,
    width: 33,
    borderRadius: 9,
    backgroundColor: "#F5EDFC",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    gap: 2,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  name: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  tag: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.primary,
    backgroundColor: "#F1E1FC",
    borderRadius: 3,
    overflow: "hidden",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  address: {
    color: colors.textMuted,
    fontSize: 10,
  },
});
