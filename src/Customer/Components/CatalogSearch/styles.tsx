import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },

  back_button: {
    width: 32,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  input_container: {
    flex: 1,
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: 14,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 13,
    color: colors.text,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
    gap: 4,
  },

  section_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  section_title: {
    marginVertical: 12,
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },

  clear_text: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },

  list_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 55,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  row_content: {
    flex: 1,
    gap: 4,
  },

  row_title: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.text,
  },

  row_subtitle: {
    fontSize: 11,
    color: colors.textMuted,
  },

  search_action: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },

  search_action_text: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },

  empty_state: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: 50,
  },

  empty_title: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },

  empty_text: {
    paddingVertical: spacing.md,
    fontSize: 12,
    textAlign: "center",
    color: colors.textMuted,
  },

  catalog_count: {
    marginTop: spacing.lg,
    textAlign: "center",
    fontSize: 11,
    color: colors.description,
  },

  product_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  product_image: {
    width: 60,
    height: 68,
    borderRadius: radius.sm,
    backgroundColor: colors.border,
  },

  price_text: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
});
