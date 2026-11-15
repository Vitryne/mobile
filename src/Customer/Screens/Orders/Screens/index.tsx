import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BottomNavBar } from "../../../Components/BottomNavBar";
import { useOrders } from "../../../Context/ordersContext";
import type { CustomerStackParamList } from "../../../Types/navigation";
import type { Order } from "../../../Types/orders";

import FeaturedOrder from "../Components/FeaturedOrder";
import OrderHistoryCard from "../Components/OrderHistoryCard";
import { styles } from "./styles";

type HistoryFilter = "all" | "delivered" | "canceled";

const CARD_GAP = 12;
const SCREEN_PADDING = 18;

export function Orders() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();

  const { width } = useWindowDimensions();

  const { activeOrders, orderHistory } = useOrders();

  const [activeIndex, setActiveIndex] = useState(0);

  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("all");

  const screenWidth = Math.min(width, 430);

  const cardWidth = screenWidth - SCREEN_PADDING * 2;

  const filteredOrders = orderHistory.filter((order) => {
    if (historyFilter === "all") {
      return true;
    }

    return order.status === historyFilter;
  });

  function handleCarouselScroll(
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    const position = event.nativeEvent.contentOffset.x;

    const index = Math.round(position / (cardWidth + CARD_GAP));

    setActiveIndex(Math.max(0, Math.min(index, activeOrders.length - 1)));
  }

  function handleFilter() {
    setHistoryFilter((current) => {
      if (current === "all") {
        return "delivered";
      }

      if (current === "delivered") {
        return "canceled";
      }

      return "all";
    });
  }

  function handleOrderDetails(order: Order) {
    navigation.navigate("OrderDetails", {
      orderId: order.id,
    });
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Pedidos</Text>

            <Text style={styles.subtitle}>
              {activeOrders.length} em andamento · {orderHistory.length} no
              histórico
            </Text>
          </View>

          <View style={styles.section_header}>
            <Text style={styles.section_title}>Em andamento</Text>

            <Text style={styles.section_hint}>Arraste para ver outros →</Text>
          </View>

          <View style={styles.carousel}>
            {activeOrders.length > 0 ? (
              <>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="fast"
                  snapToInterval={cardWidth + CARD_GAP}
                  snapToAlignment="start"
                  onMomentumScrollEnd={handleCarouselScroll}
                  contentContainerStyle={styles.carousel_content}
                >
                  {activeOrders.map((order) => (
                    <View
                      key={order.id}
                      style={{
                        width: cardWidth,
                      }}
                    >
                      <FeaturedOrder
                        order={order}
                        onPressDetails={handleOrderDetails}
                      />
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.pagination}>
                  {activeOrders.map((order, index) => (
                    <View
                      key={order.id}
                      style={[
                        styles.pagination_dot,
                        index === activeIndex && styles.pagination_dot_active,
                      ]}
                    />
                  ))}
                </View>
              </>
            ) : (
              <View style={styles.empty_state}>
                <Text style={styles.empty_text}>
                  Nenhum pedido em andamento.
                </Text>
              </View>
            )}
          </View>

          <View style={styles.history_header}>
            <Text style={styles.section_title}>Histórico de pedidos</Text>

            <Pressable
              style={styles.filter_button}
              onPress={handleFilter}
              accessibilityRole="button"
            >
              <Text style={styles.filter_text}>
                {historyFilter === "all"
                  ? "Filtrar"
                  : historyFilter === "delivered"
                    ? "Entregues"
                    : "Cancelados"}
              </Text>
            </Pressable>
          </View>

          <View style={styles.history_list}>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderHistoryCard
                  key={order.id}
                  order={order}
                  onPress={handleOrderDetails}
                />
              ))
            ) : (
              <View style={styles.empty_state}>
                <Text style={styles.empty_text}>Nenhum pedido encontrado.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      <BottomNavBar />
    </SafeAreaView>
  );
}
