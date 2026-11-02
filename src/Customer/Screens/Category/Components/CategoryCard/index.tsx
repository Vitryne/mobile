import {
    Image,
    Pressable,
    Text,
    View,
    type ImageSourcePropType,
    type StyleProp,
    type ViewStyle,
} from "react-native";

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
      {image && (
        <Image source={image} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <Text style={styles.count}>{countLabel}</Text>
      </View>
    </Pressable>
  );
}
