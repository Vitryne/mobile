import { StyleSheet } from "react-native";
import { colors } from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  splash_image: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7E22BCCC",
  },
  splash_subtitle: {
    color: colors.white,
    fontFamily: "familia/corpo",
    fontWeight: "300",
    fontSize: 20,
    lineHeight: 26.4,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 40,
    opacity: 0.8,
  },
});
