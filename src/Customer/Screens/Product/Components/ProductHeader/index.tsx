import { BackButton } from "@/Shared/Components/BackButton";
import { IconButton } from "@/Shared/Components/IconButton";
import { useTopInset } from "@/Shared/Hooks/useTopInset";
import { colors } from "@/Shared/Styles/commonStyles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import type { ProductHeaderProps } from "../../../../Types/product";
import { styles } from "./styles";

export function ProductHeader({
  isFavorite,
  cartCount,
  onBack,
  onToggleFavorite,
  onGoToStore,
  onGoToCart,
}: ProductHeaderProps) {
  const topInset = useTopInset();

  return (
    <View style={[styles.container, { top: topInset }]}>
      <BackButton onPress={onBack} />

      <View style={styles.right_group}>
        <IconButton
          icon={
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? colors.danger : colors.text}
            />
          }
          onPress={onToggleFavorite}
          accessibilityLabel={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        />

        <IconButton
          icon={
            <Ionicons name="navigate-outline" size={20} color={colors.text} />
          }
          onPress={onGoToStore}
          accessibilityLabel="Ver loja"
        />

        <IconButton
          icon={<Feather name="shopping-bag" size={20} color={colors.text} />}
          onPress={onGoToCart}
          accessibilityLabel="Sacola"
          badge={cartCount}
        />
      </View>
    </View>
  );
}
