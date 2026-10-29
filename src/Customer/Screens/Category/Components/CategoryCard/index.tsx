import {
    ImageSourcePropType,
    Pressable,
    StyleProp,
    Text,
    View,
    ViewStyle,
} from "react-native";
import { CoverImage } from "../../../../Components/CoverImage";
import { styles } from "./styles";

export type CategoryCardProps = {
  name: string;
  count: number;
  image?: ImageSourcePropType;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function CategoryCard({
  name,
  count,
  image,
  onPress,
  style,
}: CategoryCardProps) {
  const countLabel = `${count} ${count === 1 ? "peça" : "peças"}`;

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${countLabel}`}
    >
      <CoverImage source={image} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.count}>{countLabel}</Text>
      </View>
    </Pressable>
  );
}
