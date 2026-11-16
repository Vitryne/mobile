import { Feather } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { OrderHistoryCardProps } from "../../../../Types/orders";
import { styles } from "./styles";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function OrderHistoryCard({
  order,
  onPress,
}: OrderHistoryCardProps) {
  const isCanceled = order.status === "canceled";
  const isDelivered = order.status === "delivered";
  const isInProgress = !isCanceled && !isDelivered;

  const statusLabel = isCanceled
    ? "CANCELADO"
    : isDelivered
      ? "ENTREGUE"
      : "EM ANDAMENTO";

  return (
    <Pressable
      style={styles.container}
      onPress={() => onPress?.(order)}
      accessibilityRole="button"
      accessibilityLabel={`Pedido ${order.protocol}`}
    >
      <Image source={order.image} style={styles.image} resizeMode="cover" />

      <View style={styles.details}>
        <Text style={styles.meta} numberOfLines={1}>
          {order.protocol} · {order.store} · {order.date}
        </Text>

        <Text style={styles.product_name} numberOfLines={1}>
          {order.productName}
        </Text>

        <Text style={styles.subtotal}>
          {order.itemCount} {order.itemCount === 1 ? "item" : "itens"} ·{" "}
          {formatPrice(order.total)}
        </Text>
      </View>

      <View
        style={[
          styles.status_badge,
          isInProgress && styles.status_in_progress,
          isDelivered && styles.status_delivered,
          isCanceled && styles.status_canceled,
        ]}
      >
        <Text
          style={[
            styles.status_text,
            isInProgress && styles.status_text_in_progress,
            isDelivered && styles.status_text_delivered,
            isCanceled && styles.status_text_canceled,
          ]}
          numberOfLines={1}
        >
          {statusLabel}
        </Text>
      </View>

      <Feather name="chevron-right" size={16} color={colors.textMuted} />
    </Pressable>
  );
}
