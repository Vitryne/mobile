import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAF9F7",
  },
  content: {
    flex: 1,
    minHeight: 0,
    paddingHorizontal: 16,
    paddingBottom: 7,
    gap: 19,
  },
  flexSections: {
    flex: 1,
    minHeight: 0,
    gap: 17,
  },
  paymentArea: {
    height: 218,
    flexShrink: 1,
    minHeight: 0,
  },
  summaryArea: {
    flex: 1,
    minHeight: 0,
  },
});
