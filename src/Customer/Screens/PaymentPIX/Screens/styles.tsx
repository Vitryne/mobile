import { StyleSheet } from "react-native";
import {
    colors,
    commonStyles,
    radius,
    spacing,
} from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
  },

  scroll: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    justifyContent: "space-between",
  },

  main_content: {
    flexGrow: 1,
    justifyContent: "space-evenly",
  },

  demo_label: {
    marginTop: spacing.md,
    fontSize: 10,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 15,
  },

  toast: {
    marginHorizontal: 12,
    marginBottom: 6,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: colors.text,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },

  toast_text: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
});
