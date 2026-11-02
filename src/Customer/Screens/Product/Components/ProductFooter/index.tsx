import type { ProductFooterProps } from "@/Customer/Types/product";
import { colors } from "@/Shared/Styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function ProductFooter({
  price,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductFooterProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.favorite_button}
        activeOpacity={0.8}
        onPress={onToggleFavorite}
      >
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={22}
          color={colors.primary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.add_button}
        activeOpacity={0.8}
        onPress={onAddToCart}
      >
        <Ionicons name="bag-handle-outline" size={20} color={colors.white} />
        <Text style={styles.add_text}>{`Adicionar · ${price}`}</Text>
      </TouchableOpacity>
    </View>
  );
}
