import { StyleSheet } from "react-native";
import { colors } from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  splash_image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
});
