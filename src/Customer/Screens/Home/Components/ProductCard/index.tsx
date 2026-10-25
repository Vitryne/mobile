import { Ionicons } from "@expo/vector-icons";
import {
  ImageSourcePropType,
  Pressable,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { CoverImage } from "../../../../Components/CoverImage";
import { styles } from "./styles";

function formatPrice(value: number) {
  const [integer, decimals] = value.toFixed(2).split(".");
  const withThousands = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${withThousands},${decimals}`;
}

export type ProductCardProps = {
  name: string;
  store: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image?: ImageSourcePropType;
  favorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
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
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={0.8}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Abrir ${name}`}
    >
      <CoverImage source={image} style={styles.image}>
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
          accessibilityLabel={favorite ? "Remover dos favoritos" : "Favoritar"}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={16}
            color={favorite ? colors.primary : colors.text}
          />
        </Pressable>
      </CoverImage>

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
    </TouchableOpacity>
  );
}
