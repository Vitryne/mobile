import {
    colors,
    commonStyles,
    radius,
    spacing,
} from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
  },

  container: {
    flex: 1,
  },

  scroll: {
    flex: 1,
  },

  scroll_content: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },

  header: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
    marginBottom: spacing.lg,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.text,
  },

  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },

  section_header: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },

  section_title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },

  section_hint: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.primary,
  },

  carousel: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
  },

  carousel_content: {
    paddingHorizontal: 18,
    gap: 12,
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginTop: spacing.sm,
  },

  pagination_dot: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    backgroundColor: colors.border,
  },

  pagination_dot_active: {
    width: 18,
    backgroundColor: colors.primary,
  },

  history_header: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  filter_button: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },

  filter_text: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },

  history_list: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
    gap: 10,
  },

  empty_state: {
    minHeight: 110,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },

  empty_text: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
