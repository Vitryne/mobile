import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { OrderDetailsStatusProps } from "../../../../Types/orderDetails";
import type { OrderStatus } from "../../../../Types/orders";
import { styles } from "./styles";

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Aguardando confirmação da loja",
  confirmed: "Pedido confirmado",
  preparing: "Pedido em preparação",
  ready_for_pickup: "Pronto para coleta",
  delivering: "Pedido em entrega",
  delivered: "Entregue com sucesso",
  canceled: "Pedido cancelado",
};

export default function OrderDetailsStatus({
  status,
  date,
  onBuyAgain,
}: OrderDetailsStatusProps) {
  const delivered = status === "delivered";
  const canceled = status === "canceled";

  const statusColor = canceled
    ? colors.danger
    : delivered
      ? colors.success
      : colors.primary;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.icon_box,
          delivered && styles.icon_delivered,
          canceled && styles.icon_canceled,
        ]}
      >
        <Feather
          name={
            delivered
              ? "check"
              : canceled
                ? "x"
                : status === "pending"
                  ? "clock"
                  : status === "delivering"
                    ? "truck"
                    : "package"
          }
          size={20}
          color={statusColor}
        />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{STATUS_LABELS[status]}</Text>

        <Text style={styles.date}>{date}</Text>
      </View>

      {delivered && (
        <Pressable
          style={styles.buy_again}
          onPress={onBuyAgain}
          accessibilityRole="button"
        >
          <Text style={styles.buy_again_text}>RECOMPRAR</Text>
        </Pressable>
      )}
    </View>
  );
}
