import { StyleSheet } from "react-native";
// Ajuste o caminho abaixo conforme a pasta real do commonStyles no seu projeto
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

  // Wrapper que mede (via onLayout) o espaço disponível para os slides
  slidesArea: {
    flex: 1,
  },

  // Ocupa uma fração da altura de cada slide, sem valor fixo em pixels
  imageContainer: {
    flex: 0.58,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end", // empurra o gradiente para o rodapé da imagem
  },
  // Sem position: absolute - o efeito de esmaecimento é feito com
  // flex + justifyContent no elemento pai (image)
  gradient: {
    height: "55%",
  },

  content: {
    flex: 0.42,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    justifyContent: "flex-start",
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
    marginBottom: spacing.lg,
  },

  dotsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    marginHorizontal: spacing.xs,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.primary,
  },

  // Botões ficam fixos fora do FlatList de slides (aparecem em todas as páginas)
  buttonsContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginBottom: spacing.sm + spacing.xs, // 12
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.full,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});
