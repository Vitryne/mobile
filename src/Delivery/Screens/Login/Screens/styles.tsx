import { StyleSheet } from "react-native";
import { colors, radius } from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 24,
        paddingTop: 150
    },
    logoRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    badge: {
        backgroundColor: colors.primarySoft,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: radius.full,
        marginLeft: 10
    },
    badgeText: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "700",
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: colors.text,
        marginTop: 32,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textMuted,
        marginTop: 8,
    },
    scroll_content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 32 + 8,
    },
    forgotPasswordLink: {
        alignSelf: "center",
        marginTop: 8,
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "600",
    },
    submitButton: {
        height: 54,
        borderRadius: radius.full,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },
    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        marginHorizontal: 16,
        color: colors.textMuted,
        fontSize: 13,
    },
    googleButton: {
        height: 54,
        borderRadius: radius.full,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    googleIconPlaceholder: {
        fontSize: 16,
        fontWeight: "700",
        color: "#4285F4", // cor oficial da marca Google, fora da paleta do app mesmo
    },
    googleButtonText: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.text,
    },
    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        flexWrap: "wrap",
    },
    signupText: {
        color: colors.textMuted,
        fontSize: 14,
    },
    signupLink: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "700",
    },
    clientLoginRow: {
        alignItems: "center",
        marginTop: 32,
    },
    clientLoginText: {
        color: colors.textMuted,
        fontSize: 13,
    },
    footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: colors.background,
  },
});