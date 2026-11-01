import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 0,
    gap: 9,
  },
  headingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  count: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.primary,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    borderColor: "#E9E5ED",
    borderWidth: 1,
    overflow: "hidden",
    flex: 1,
    minHeight: 0,
  },
  products: {
    flex: 1,
    minHeight: 0,
  },
  item: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F0F4",
  },
  image: {
    width: 45,
    height: 54,
    borderRadius: 7,
    backgroundColor: "#F3F2F3",
  },
  details: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: 10,
    color: colors.textMuted,
  },
  price: {
    fontSize: 12,
    color: colors.text,
    fontWeight: "700",
  },
  coupon: {
    flexDirection: "row",
    backgroundColor: "#F6EFFB",
    alignItems: "center",
    paddingVertical: 9,
    paddingHorizontal: 12,
    gap: 6,
  },
  couponLabel: {
    color: colors.primary,
    fontSize: 10,
    flex: 1,
  },
  couponValue: {
    color: colors.textMuted,
    fontSize: 10,
  },
  totals: {
    gap: 7,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  muted: {
    color: colors.textMuted,
    fontSize: 11,
  },
  amount: {
    color: colors.text,
    fontSize: 11,
  },
  discount: {
    color: "#23A566",
    fontSize: 11,
  },
  totalRow: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F1EFF2",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
  },
  totalValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  productContent: {},
});
