import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  bars: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
  },
  bar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#E5E5E5",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
  },
});
