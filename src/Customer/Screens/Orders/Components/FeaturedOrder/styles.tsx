import { colors, radius, spacing } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  header_info: {
    flex: 1,
    gap: 3,
  },

  protocol: {
    fontSize: 11,
    color: colors.textMuted,
  },

  store_name: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },

  eta_badge: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
  },

  eta_text: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "700",
  },

  progress_container: {
    flexDirection: "row",
    gap: 4,
    marginTop: spacing.md,
    marginBottom: 14,
  },

  progress_segment: {
    height: 4,
    flex: 1,
    borderRadius: radius.full,
    backgroundColor: colors.border,
  },

  progress_segment_active: {
    backgroundColor: colors.primary,
  },

  status_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },

  status_icon: {
    width: 25,
    height: 25,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  status_info: {
    flex: 1,
    gap: 3,
  },

  status_title: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text,
  },

  status_description: {
    fontSize: 11,
    color: colors.textMuted,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 12,
  },

  summary_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  products_preview: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  product_images: {
    flexDirection: "row",
    alignItems: "center",
  },

  product_image: {
    width: 25,
    height: 25,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.white,
  },

  product_image_overlap: {
    marginLeft: -9,
  },

  items_count: {
    fontSize: 11,
    color: colors.textMuted,
  },

  total: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  details_button: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: spacing.sm,
    paddingVertical: 3,
    gap: 2,
  },

  details_text: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
});
