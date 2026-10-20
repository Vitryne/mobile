import type { ProductInfoProps } from "@/Customer/Types/product";
import { Text, View } from "react-native";
import { styles } from "./styles";

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.reference}>{product.reference}</Text>

      <View style={styles.price_row}>
        <Text style={styles.price}>
          {product.price}
          <Text style={styles.price_cents}>{product.priceCents}</Text>
        </Text>

        <Text style={styles.old_price}>{product.oldPrice}</Text>

        <View style={styles.discount}>
          <Text style={styles.discount_text}>{product.discount}</Text>
        </View>
      </View>

      <Text style={styles.installments}>{product.installments}</Text>
    </View>
  );
}
