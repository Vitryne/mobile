import { StyleSheet } from "react-native";
import { colors } from "../../../../Shared/Styles/commonStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative",
    // justifyContent: "flex-end",
    // overflow: "visible",
  },
  image_wrapper: {
    height: 380, // ajuste esse valor conforme o quanto de imagem você quer visível
    position: "relative",
    backgroundColor: colors.background,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "70%", // fade dentro da própria imagem
    width: "100%",
  },

  // Texto no fluxo normal — sem absolute, sem "colar" na imagem
  text_block: {
    paddingHorizontal: 34,
    paddingTop: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1a1a1a",
    lineHeight: 30,
  },
  title_purple: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    lineHeight: 20,
  },
  dots_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ddd",
  },
  dot_active: {
    width: 18,
    backgroundColor: colors.primary,
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: colors.background,
    gap: 12,
  },
});
