import { StyleSheet } from "react-native";
import { colors, spacing } from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FAFAF9",
  },

  scroll: {
    flex: 1,
  },

  scroll_content: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: spacing.md,
    paddingTop: 28,
    paddingBottom: spacing.xl,
    gap: 26,
  },

  version_text: {
    marginTop: -8,
    color: colors.description,
    textAlign: "center",
    fontSize: 10,
  },
});
