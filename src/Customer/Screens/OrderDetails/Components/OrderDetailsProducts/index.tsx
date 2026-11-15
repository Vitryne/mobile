import { Image, Text, View } from "react-native";
import { formatPrice } from "../../../../../Shared/Utils/formatPrice";
import type { OrderDetailsProductsProps } from "../../../../Types/orderDetails";
import { styles } from "./styles";

export default function OrderDetailsProducts({
  products,
}: OrderDetailsProductsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Itens do pedido</Text>

      <View style={styles.list}>
        {products.map((product, index) => (
          <View key={`${product.id}-${index}`} style={styles.product_row}>
            <Image
              source={product.image}
              style={styles.product_image}
              resizeMode="cover"
            />

            <View style={styles.product_info}>
              <Text style={styles.product_name} numberOfLines={2}>
                {product.name}
              </Text>

              <Text style={styles.product_description}>
                {product.size ? `Tamanho ${product.size} · ` : ""}
                {product.quantity ?? 1}{" "}
                {(product.quantity ?? 1) === 1 ? "item" : "itens"}
              </Text>

              {product.price !== undefined && (
                <Text style={styles.product_price}>
                  {formatPrice(product.price * (product.quantity ?? 1))}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
