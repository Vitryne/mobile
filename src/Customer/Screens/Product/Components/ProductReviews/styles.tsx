import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
  },
  card: {
    gap: 10,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  card_header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar_text: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  user_info: {
    flex: 1,
  },
  user: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  time: {
    fontSize: 12,
    color: colors.textMuted,
  },
  rating_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  rating_value: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
  reply: {
    gap: 4,
    padding: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.background,
  },
  reply_label: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primary,
  },
  reply_text: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
  },
});
