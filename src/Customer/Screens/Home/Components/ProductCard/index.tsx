import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    Pressable,
    Text,
    View,
    type ImageSourcePropType,
    type StyleProp,
    type ViewStyle,
} from "react-native";

import { colors } from "../../../../../Shared/Styles/commonStyles";
import { formatPrice } from "../../../../../Shared/Utils/formatPrice";
import { styles } from "./styles";

export type ProductCardProps = {
  name: string;
  store: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image?: ImageSourcePropType;
  favorite: boolean;
  onToggleFavorite: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ProductCard({
  name,
  store,
  price,
  oldPrice,
  discount,
  image,
  favorite,
  onToggleFavorite,
  onPress,
  style,
}: ProductCardProps) {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={name}
    >
      <View style={styles.image_container}>
        {image && (
          <Image source={image} style={styles.image} resizeMode="cover" />
        )}

        <View style={styles.image_actions}>
          {discount ? (
            <View style={styles.discount_badge}>
              <Text style={styles.discount_text}>-{discount}%</Text>
            </View>
          ) : (
            <View />
          )}

          <Pressable
            style={styles.heart_button}
            onPress={onToggleFavorite}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={
              favorite ? "Remover dos favoritos" : "Favoritar"
            }
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={16}
              color={favorite ? colors.primary : colors.text}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.store} numberOfLines={1}>
          {store}
        </Text>

        <View style={styles.price_row}>
          <Text style={styles.price}>{formatPrice(price)}</Text>

          {oldPrice ? (
            <Text style={styles.old_price}>{formatPrice(oldPrice)}</Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
