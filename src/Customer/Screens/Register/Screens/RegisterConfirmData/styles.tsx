import { StyleSheet } from "react-native";
import { colors, radius } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 90,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 30,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 28,
    fontSize: 13,
    color: colors.description,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  editText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  dataRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  lastRow: {
    marginBottom: 0,
  },
  label: {
    fontSize: 12,
    color: colors.description,
    marginRight: 12,
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: colors.text,
    textAlign: "right",
  },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 2,
    marginBottom: 36,
  },
  checkCircle: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginTop: 1,
  },
  termsText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 14,
    color: colors.textMuted,
  },
  link: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginTop: "auto",
  },
});
