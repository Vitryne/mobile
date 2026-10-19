import type { ProductGalleryProps } from "@/Customer/Types/product";
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function ProductGallery({
  images,
  selectedIndex,
  onSelect,
}: ProductGalleryProps) {
  return (
    <View style={styles.container}>
      <Image source={images[selectedIndex]} style={styles.main_image} />

      <View style={styles.thumbs}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => onSelect(index)}
            style={[
              styles.thumb,
              index === selectedIndex && styles.thumb_selected,
            ]}
          >
            <Image source={image} style={styles.thumb_image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}