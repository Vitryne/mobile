import { Feather } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { formatPrice } from "../../../../../Shared/Utils/formatPrice";
import type { OrderSummaryProps } from "../../../..//Types/payment";
import { styles } from "./styles";

export default function OrderSummary({
  stores,
  subtotal,
  delivery,
  discount,
  total,
  onCoupon,
}: OrderSummaryProps) {
  const items = stores.flatMap((store) =>
    store.items.map((item) => ({ ...item, storeName: store.name })),
  );
  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>Endereço de entrega</Text>
        <Text style={styles.count}>
          {items.length} itens · {stores.length} lojas
        </Text>
      </View>
      <View style={styles.card}>
        <ScrollView
          nestedScrollEnabled
          style={styles.products}
          contentContainerStyle={styles.productContent}
          showsVerticalScrollIndicator
        >
          {items.map((item) => (
            <View key={item.id} style={styles.item}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.details}>
                <Text numberOfLines={1} style={styles.name}>
                  {item.name}
                </Text>
                <Text numberOfLines={2} style={styles.subtitle}>
                  {item.storeName} · Tam. {item.size} · {item.quantity} uni
                </Text>
              </View>
              <Text style={styles.price}>
                {formatPrice(item.price * item.quantity)}
              </Text>
            </View>
          ))}
        </ScrollView>
        <Pressable style={styles.coupon} onPress={onCoupon}>
          <Feather name="tag" size={13} color={colors.primary} />
          <Text style={styles.couponLabel}>Adicionar cupom</Text>
          <Text style={styles.couponValue}>Nenhum aplicado</Text>
        </Pressable>
        <View style={styles.totals}>
          <View style={styles.row}>
            <Text style={styles.muted}>Subtotal</Text>
            <Text style={styles.amount}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.muted}>Entrega</Text>
            <Text style={styles.amount}>{formatPrice(delivery)}</Text>
          </View>
          {discount > 0 && (
            <View style={styles.row}>
              <Text style={styles.discount}>Desconto PIX (5%)</Text>
              <Text style={styles.discount}>- {formatPrice(discount)}</Text>
            </View>
          )}
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
