import { Platform, StyleSheet } from "react-native";
import {
    colors,
    radius,
    spacing,
} from "../../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 22, // valor exato do Figma (não é um token de spacing)
    // 32 é o gap real, do Figma, entre o fim do header e o título. No
    // navegador (Expo Web) o RegisterHeader não tem status bar/notch pra
    // calcular o insets.top, então a gente soma uma compensação extra só
    // nessa plataforma pra não sobrepor, sem mexer no componente
    // compartilhado.
    paddingTop: Platform.select({
      web: 32 + 24, // 32 real + ~24 de compensação pro insets.top que falta
      default: 32,
    }),
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    lineHeight: 30,
    marginTop: spacing.xl,
  },
  subtitle: {
    fontSize: 13,
    color: "#9A9A9A", // mesma cor usada no subtitle do RegisterPersonalData
    marginTop: 4, // idem
    marginBottom: 94, // gap exato do Figma até o parágrafo (exclusivo desta tela)
  },

  paragraph: {
    fontSize: 16,
    color: colors.textMuted,
    lineHeight: 20,
  },
  paragraphHighlight: {
    color: colors.primary,
    fontWeight: "600",
  },

  // Input de verdade fica invisível - só capta o teclado, some da tela
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 0,
    width: 0,
  },

  codeRow: {
    flexDirection: "row",
    gap: 10, // 6 caixas de 52 + 5 gaps de 10 = 362px exatos
    marginTop: 40, // gap exato do Figma entre o parágrafo e o código
    marginBottom: 14, // var(--sp-14) do Figma até "Não recebeu o código?"
    // O Figma mostra 20 de padding nessa linha contra 22 do resto do
    // conteúdo - esses -2 compensam a diferença sem duplicar o container.
    marginHorizontal: -2,
  },
  codeBox: {
    width: 52, // tamanho fixo exato do Figma (W Fixed 52px)
    height: 60, // (H Fixed 60px)
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  codeBoxFocused: {
    borderColor: colors.primary,
  },
  codeBoxError: {
    borderColor: colors.danger,
  },
  codeBoxLocked: {
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  codeDigit: {
    fontSize: 24, // bate com o "Hug 15x30" do Figma pro dígito
    fontWeight: "700",
    color: colors.text,
  },
  codeDigitError: {
    color: colors.danger,
  },
  codeDigitLocked: {
    color: colors.textMuted,
  },
  codeCursor: {
    width: 1.5,
    height: 22,
    backgroundColor: colors.primary,
  },

  helperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  helperRowBetween: {
    flexDirection: "row",
    alignItems: "center",
  },
  helperText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  helperTextMuted: {
    fontSize: 13,
    color: "#000000",
  },
  resendLink: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    flexShrink: 1,
  },
  lockedText: {
    fontSize: 13,
    color: colors.textMuted,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingLeft: 22,
    paddingRight: 20,
    // paddingBottom vem inline no componente: insets.bottom + 30
    // (o "64" do Figma é esse total num device com home indicator de 34)
    gap: 30, // gap exato do Figma entre o botão e a security note
    backgroundColor: colors.background,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 21, // gap exato do Figma entre o ícone e o texto
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
    paddingTop: 18,
    paddingLeft: 19,
    paddingRight: 20,
    paddingBottom: 18,
  },
  securityNoteText: {
    flex: 1,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 16,
  },
});
