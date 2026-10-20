import { colors, radius } from "@/Shared/Styles/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar_text: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  meta_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  meta_text: {
    fontSize: 12,
    color: colors.textMuted,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    backgroundColor: colors.successSoft,
  },
  status_closed: {
    backgroundColor: colors.dangerSoft,
  },
  status_text: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.success,
  },
  status_text_closed: {
    color: colors.danger,
  },
});
