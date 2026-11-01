import { StyleSheet } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 30,
    backgroundColor: colors.primarySoft,
    marginBottom: 10,
  },

  badge_expired: {
    backgroundColor: "#FBE7EC",
  },

  badge_text: {
    fontSize: 12,
    color: colors.warning,
  },

  text_expired: {
    color: colors.danger,
    textShadowColor: "#FBE7EC",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },

  label: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },

  amount: {
    fontSize: 27,
    fontWeight: "800",
    color: colors.primary,
    marginTop: 1,
  },
});
