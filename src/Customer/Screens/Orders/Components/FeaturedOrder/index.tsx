import type { FeaturedOrderProps, OrderStatus } from "@/Customer/Types/orders";
import { colors } from "@/Shared/Styles/commonStyles";
import { formatPrice } from "@/Shared/Utils/formatPrice";
import { Feather } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

const STATUS_INFO: Record<
  OrderStatus,
  { title: string; description: string; step: number }
> = {
  pending: {
    title: "Pendente",
    description: "Aguardando confirmação da loja",
    step: 1,
  },
  confirmed: {
    title: "Confirmado",
    description: "Pedido confirmado pela loja",
    step: 2,
  },
  preparing: {
    title: "Preparando",
    description: "A loja está preparando seu pedido",
    step: 3,
  },
  delivering: {
    title: "Em entrega",
    description: "Seu pedido está a caminho",
    step: 5,
  },
  delivered: {
    title: "Entregue",
    description: "Seu pedido foi entregue",
    step: 6,
  },
  canceled: {
    title: "Cancelado",
    description: "Este pedido foi cancelado",
    step: 0,
  },
};

export default function FeaturedOrder({
  order,
  onPressDetails,
}: FeaturedOrderProps) {
  const status = STATUS_INFO[order.status];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_info}>
          <Text style={styles.protocol}>{order.protocol}</Text>
          <Text style={styles.store_name}>{order.store}</Text>
        </View>

        {order.estimatedTime && (
          <View style={styles.eta_badge}>
            <Text style={styles.eta_text}>CHEGA EM {order.estimatedTime}</Text>
          </View>
        )}
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
          <Feather name="clock" size={15} color={colors.white} />
        </View>

        <View style={styles.status_info}>
          <Text style={styles.status_title}>{status.title}</Text>
          <Text style={styles.status_description}>{status.description}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.summary_row}>
        <View style={styles.products_preview}>
          <View style={styles.product_images}>
            {order.products.slice(0, 3).map((product, index) => (
              <Image
                key={product.id}
                source={product.image}
                style={[
                  styles.product_image,
                  index > 0 && styles.product_image_overlap,
                ]}
                resizeMode="cover"
              />
            ))}
          </View>

          <Text style={styles.items_count}>{order.itemCount} itens</Text>
        </View>

        <Text style={styles.total}>{formatPrice(order.total)}</Text>
      </View>

      <Pressable
        onPress={() => onPressDetails?.(order)}
        style={styles.details_button}
        accessibilityRole="button"
      >
        <Text style={styles.details_text}>Ver detalhes</Text>
        <Feather name="chevron-right" size={14} color={colors.primary} />
      </Pressable>
    </View>
  );
}
