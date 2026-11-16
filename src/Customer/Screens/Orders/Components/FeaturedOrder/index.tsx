import { Feather } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { FeaturedOrderProps, OrderStatus } from "../../../../Types/orders";
import { styles } from "./styles";

const STATUS_INFO: Record<
  OrderStatus,
  {
    title: string;
    description: string;
    step: number;
    icon: React.ComponentProps<typeof Feather>["name"];
  }
> = {
  pending: {
    title: "Pendente",
    description: "Aguardando confirmação da loja",
    step: 1,
    icon: "clock",
  },
  confirmed: {
    title: "Confirmado",
    description: "Seu pedido será preparado em breve",
    step: 2,
    icon: "check",
  },
  preparing: {
    title: "Em preparo",
    description: "A loja está preparando seu pedido",
    step: 3,
    icon: "package",
  },
  ready_for_pickup: {
    title: "Pronto p/ coleta",
    description: "Entregador a caminho da loja",
    step: 4,
    icon: "truck",
  },
  delivering: {
    title: "Em entrega",
    description: "A caminho do seu endereço",
    step: 5,
    icon: "truck",
  },
  delivered: {
    title: "Entregue",
    description: "Maravilha, seu pedido foi entregue",
    step: 6,
    icon: "check",
  },
  canceled: {
    title: "Cancelado",
    description: "Este pedido foi cancelado",
    step: 0,
    icon: "x",
  },
};

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function FeaturedOrder({
  order,
  onPressDetails,
  onAdvanceStatus,
}: FeaturedOrderProps) {
  const status = STATUS_INFO[order.status];

  const isDelivered = order.status === "delivered";
  const isCanceled = order.status === "canceled";
  const isPickup = order.status === "ready_for_pickup";
  const isDelivering = order.status === "delivering";

  const showCode = isPickup || isDelivering;

  const code = isPickup
    ? (order.pickupCode ?? "1524")
    : (order.deliveryCode ?? "4829");

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_info}>
            <Text style={styles.protocol}>{order.protocol}</Text>

            <Text style={styles.store_name}>{order.store}</Text>
          </View>

          <View
            style={[styles.eta_badge, isDelivered && styles.delivered_badge]}
          >
            <Text
              style={[
                styles.eta_text,
                isDelivered && styles.delivered_badge_text,
              ]}
            >
              {isDelivered
                ? "PEDIDO ENTREGUE"
                : isCanceled
                  ? "CANCELADO"
                  : `CHEGA EM ${order.estimatedTime ?? "12-18 MIN"}`}
            </Text>
          </View>
        </View>

        <View style={styles.progress_container}>
          {Array.from({ length: 6 }, (_, index) => (
            <View
              key={index}
              style={[
                styles.progress_segment,
                index < status.step && styles.progress_segment_active,
              ]}
            />
          ))}
        </View>

        <View style={styles.status_row}>
          <View style={styles.status_icon}>
            <Feather name={status.icon} size={15} color={colors.white} />
          </View>

          <View style={styles.status_info}>
            <Text style={styles.status_title}>{status.title}</Text>

            <Text style={styles.status_description}>{status.description}</Text>
          </View>

          {showCode && (
            <View style={styles.code_container}>
              <Text style={styles.code_label}>
                {isPickup ? "CÓDIGO DE COLETA" : "CÓDIGO DE ENTREGA"}
              </Text>

              <Text style={styles.code_value}>{code.split("").join("  ")}</Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.summary_row}>
          <View style={styles.products_preview}>
            <View style={styles.product_images}>
              {order.products.slice(0, 3).map((product, index) => (
                <Image
                  key={`${product.id}-${index}`}
                  source={product.image}
                  style={[
                    styles.product_image,
                    index > 0 && styles.product_image_overlap,
                  ]}
                  resizeMode="cover"
                />
              ))}
            </View>

            <Text style={styles.items_count}>
              {order.itemCount} {order.itemCount === 1 ? "item" : "itens"}
            </Text>
          </View>

          <Text style={styles.total}>{formatPrice(order.total)}</Text>
        </View>

        <Pressable
          style={styles.details_button}
          onPress={() => onPressDetails?.(order)}
          accessibilityRole="button"
        >
          <Text style={styles.details_text}>Ver detalhes</Text>

          <Feather name="chevron-right" size={14} color={colors.primary} />
        </Pressable>
      </View>

      {onAdvanceStatus && !isDelivered && !isCanceled && (
        <Pressable
          style={styles.mock_button}
          onPress={() => onAdvanceStatus(order)}
          accessibilityRole="button"
        >
          <Feather name="refresh-cw" size={13} color={colors.primary} />

          <Text style={styles.mock_button_text}>Avançar status (mock)</Text>
        </Pressable>
      )}
    </View>
  );
}
