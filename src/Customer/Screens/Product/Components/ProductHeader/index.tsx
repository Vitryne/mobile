import { colors } from "@/Shared/Styles/commonStyles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { top: insets.top + 8 }]}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={20} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.right_group}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onToggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? colors.danger : colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onGoToStore}
        >
          <Ionicons name="navigate-outline" size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onGoToCart}
        >
          <Feather name="shopping-bag" size={20} color={colors.text} />

          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badge_text}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
