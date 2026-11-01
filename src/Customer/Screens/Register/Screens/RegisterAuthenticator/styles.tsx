import { Platform, StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: Platform.select({
      web: 32 + 24,
      default: 32,
    }),
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 30,
    marginTop: spacing.xl,
  },
  subtitle: {
    fontSize: 13,
    color: "#9A9A9A",
    marginTop: 4,
    marginBottom: 94,
  },

  paragraph: {
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 20,
  },
  paragraphHighlight: {
    color: colors.primary,
    fontWeight: "600",
  },

  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },

  codeRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 40,
    marginBottom: 14,
    marginHorizontal: -2,
  },
  codeBox: {
    width: 52,
    height: 60,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  codeBoxFocused: {
    borderColor: colors.primary,
  },
  codeBoxError: {
    borderColor: colors.danger,
  },
  codeBoxLocked: {
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  codeDigit: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
  },
  codeDigitError: {
    color: colors.danger,
  },
  codeDigitLocked: {
    color: colors.textMuted,
  },
  codeCursor: {
    width: 1.5,
    height: 22,
    backgroundColor: colors.primary,
  },

  helperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  helperRowBetween: {
    flexDirection: "row",
    alignItems: "center",
  },
  helperText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  helperTextMuted: {
    fontSize: 13,
    color: "#000000",
  },
  resendLink: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    flexShrink: 1,
  },
  lockedText: {
    fontSize: 13,
    color: colors.textMuted,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingLeft: 22,
    paddingRight: 20,
    gap: 30,
    backgroundColor: colors.background,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 21,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    paddingTop: 18,
    paddingLeft: 19,
    paddingRight: 20,
    paddingBottom: 18,
  },
  securityNoteText: {
    flex: 1,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
  },
});
