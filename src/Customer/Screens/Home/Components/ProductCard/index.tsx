import { Ionicons } from "@expo/vector-icons";
import {
    ImageSourcePropType,
    Pressable,
    StyleProp,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { CoverImage } from "../CoverImage";
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
  discount?: number; // em %, aparece como "-18%"
  image?: ImageSourcePropType;
  favorite: boolean;
  onToggleFavorite: () => void;
  // Quem usa o card define a largura (ex: grade de 2 colunas na Home).
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
  style,
}: ProductCardProps) {
  return (
    <View style={[styles.container, style]}>
      <CoverImage source={image} style={styles.image}>
        {discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discount}%</Text>
          </View>
        ) : (
          <View />
        )}

        <Pressable
          style={styles.heartButton}
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

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          {oldPrice ? (
            <Text style={styles.oldPrice}>{formatPrice(oldPrice)}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
