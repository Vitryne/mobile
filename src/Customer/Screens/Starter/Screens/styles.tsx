import { StyleSheet } from "react-native";
// Ajuste o caminho conforme a pasta real do commonStyles no seu projeto
import {
    colors,
    radius,
    spacing,
} from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // A FlatList horizontal ocupa todo o espaço acima do footer
  list: {
    flex: 1,
  },

  // Cada "página" da FlatList: width e height são aplicados inline no
  // starter.tsx (width via useWindowDimensions, height via onLayout medido
  // no próprio FlatList) - porcentagem ("100%") não resolve de forma
  // confiável dentro do conteúdo de uma lista horizontal.
  slide: {},

  // A foto absorve todo o espaço que sobrar depois do texto/dots
  imageContainer: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },

  // Camada de esmaecimento por cima da foto (único uso de absolute do arquivo)
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "55%",
  },

  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
    lineHeight: 36,
  },
  titleHighlight: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.primary,
    lineHeight: 36,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 21,
  },

  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    marginRight: spacing.xs,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.primary,
  },

  // Footer: fixo embaixo, fora da FlatList
  footer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.sm + spacing.xs, // 12 - espaço entre os dois botões
  },
});
