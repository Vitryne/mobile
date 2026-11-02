import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    padding: 14,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 20,
  },
  badge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: "700",
  },
  text: {
    flex: 1,
    fontSize: 11,
    color: colors.textMuted,
  },
});
