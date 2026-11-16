import { Feather } from "@expo/vector-icons";
import {
    useNavigation,
    useRoute,
    type RouteProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../../../Shared/Styles/commonStyles";
import { useOrders } from "../../../Context/ordersContext";
import type { CustomerStackParamList } from "../../../Types/navigation";

import OrderDetailsProducts from "../Components/OrderDetailsProducts";
import OrderDetailsStatus from "../Components/OrderDetailsStatus";
import { styles } from "./styles";

type Navigation = NativeStackNavigationProp<CustomerStackParamList>;

type DetailsRoute = RouteProp<CustomerStackParamList, "OrderDetails">;

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function OrderDetails() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<DetailsRoute>();

  const { getOrderById } = useOrders();

  const order = getOrderById(route.params.orderId);

  function handleBuyAgain() {
    navigation.navigate("Home");
  }

  function handleDownloadInvoice() {
    Alert.alert(
      "Nota fiscal",
      "A nota fiscal ainda não está disponível nesta demonstração.",
    );
  }

  if (!order) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.empty_container}>
          <Text style={styles.empty_text}>Pedido não encontrado.</Text>

          <Pressable onPress={() => navigation.navigate("Orders")}>
            <Text style={styles.empty_link}>Voltar para Pedidos</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const paymentLabel = order.paymentMethod === "card" ? "Cartão" : "PIX";

  const subtotal = order.subtotal;
  const delivery = order.deliveryFee;
  const discount = order.discount ?? 0;

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.back_button}
            onPress={() =>
              navigation.canGoBack()
                ? navigation.goBack()
                : navigation.navigate("Orders")
            }
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Feather name="arrow-left" size={20} color={colors.text} />
          </Pressable>

          <View style={styles.header_info}>
            <Text style={styles.title}>Pedido {order.protocol}</Text>

            <Text style={styles.store_name}>{order.store}</Text>
          </View>
        </View>

        <OrderDetailsStatus
          status={order.status}
          date={order.date}
          onBuyAgain={handleBuyAgain}
        />

        <OrderDetailsProducts products={order.products} />

        <View style={styles.info_card}>
          <View style={styles.info_icon}>
            <Feather name="map-pin" size={18} color={colors.primary} />
          </View>

          <View style={styles.info_texts}>
            <Text style={styles.info_title}>Endereço</Text>

            <Text style={styles.info_description}>
              {order.address ?? "Rua das Palmeiras, 218 · Zona 7 · Maringá"}
            </Text>
          </View>
        </View>

        <View style={styles.info_card}>
          <View style={styles.info_icon}>
            <Feather name="credit-card" size={18} color={colors.primary} />
          </View>

          <View style={styles.info_texts}>
            <Text style={styles.info_title}>Pagamento</Text>

            <Text style={styles.info_description}>{paymentLabel}</Text>
          </View>
        </View>

        <View style={styles.totals_card}>
          {subtotal !== undefined && (
            <View style={styles.total_row}>
              <Text style={styles.total_label}>Subtotal</Text>

              <Text style={styles.total_value}>{formatPrice(subtotal)}</Text>
            </View>
          )}

          {delivery !== undefined && (
            <View style={styles.total_row}>
              <Text style={styles.total_label}>Entrega</Text>

              <Text style={styles.total_value}>{formatPrice(delivery)}</Text>
            </View>
          )}

          {discount > 0 && (
            <View style={styles.total_row}>
              <Text style={styles.discount_text}>Desconto PIX</Text>

              <Text style={styles.discount_text}>
                - {formatPrice(discount)}
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.total_row}>
            <Text style={styles.final_label}>Total</Text>

            <Text style={styles.final_value}>{formatPrice(order.total)}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={styles.primary_button}
            onPress={handleBuyAgain}
            accessibilityRole="button"
          >
            <Feather name="shopping-bag" size={16} color={colors.white} />

            <Text style={styles.primary_button_text}>Comprar novamente</Text>
          </Pressable>

          <Pressable
            style={styles.secondary_button}
            onPress={handleDownloadInvoice}
            accessibilityRole="button"
          >
            <Feather name="download" size={16} color={colors.primary} />

            <Text style={styles.secondary_button_text}>Baixar nota fiscal</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
