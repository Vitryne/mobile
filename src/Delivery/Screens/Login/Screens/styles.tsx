import { StyleSheet } from "react-native";
import { colors, radius } from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 24,
        paddingTop: 150,
    },
    logo_row: {
        flexDirection: "row",
        alignItems: "center",
    },
    badge: {
        backgroundColor: colors.primarySoft,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: radius.full,
        marginLeft: 10,
    },
    badge_text: {
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
        paddingBottom: 96, // dá espaço pro footer fixo não cobrir o último item
    },
    forgot_password_link: {
        alignSelf: "center",
        marginTop: 8,
        marginBottom: 24,
    },
    forgot_password_text: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "600",
    },
    submit_button: {
        height: 54,
        borderRadius: radius.full,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    submit_button_disabled: {
        opacity: 0.5,
    },
    submit_button_text: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "700",
    },
    divider_row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },
    divider_line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    divider_text: {
        marginHorizontal: 16,
        color: colors.textMuted,
        fontSize: 13,
    },
    google_button: {
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
    google_icon_placeholder: {
        fontSize: 16,
        fontWeight: "700",
        color: "#4285F4", // cor oficial da marca Google, fora da paleta do app mesmo
    },
    google_button_text: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.text,
    },
    signup_row: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        flexWrap: "wrap",
    },
    signup_text: {
        color: colors.textMuted,
        fontSize: 14,
    },
    signup_link: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "700",
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
    client_login_row: {
        alignItems: "center",
    },
    client_login_text: {
        color: colors.textMuted,
        fontSize: 13,
    },
});