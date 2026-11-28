import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  useNavigation,
  type CompositeNavigationProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../../../Shared/Styles/commonStyles";
import { useOrders } from "../../../Hooks/useOrders";
import type {
  CustomerStackParamList,
  CustomerTabParamList,
} from "../../../Types/navigation";
import type { Order } from "../../../Types/orders";

import FeaturedOrder from "../Components/FeaturedOrder";
import OrderHistoryCard from "../Components/OrderHistoryCard";
import { styles } from "./styles";

type HistoryFilter = "all" | "in_progress" | "delivered" | "canceled";

const CARD_GAP = 12;
const SCREEN_PADDING = 18;

type OrdersNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<CustomerTabParamList, "Orders">,
  NativeStackNavigationProp<CustomerStackParamList>
>;

export function Orders() {
  const navigation = useNavigation<OrdersNavigation>();

  const { width } = useWindowDimensions();

  const { activeOrders, orderHistory, isLoading, loadError, reload } =
    useOrders();

  const [activeIndex, setActiveIndex] = useState(0);

  const [scrollX] = useState(() => new Animated.Value(0));

  const carouselRef = useRef<ScrollView>(null);

  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, []);

  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("all");

  const screenWidth = Math.min(width, 430);

  const cardWidth = screenWidth - SCREEN_PADDING * 2;

  const cardStep = cardWidth + CARD_GAP;

  const hasManyActive = activeOrders.length > 1;

  const currentIndex = Math.min(
    activeIndex,
    Math.max(activeOrders.length - 1, 0),
  );

  const allOrders = [
    ...activeOrders,
    ...orderHistory.filter(
      (historyOrder) =>
        !activeOrders.some((activeOrder) => activeOrder.id === historyOrder.id),
    ),
  ];

  const inProgressOrders = allOrders.filter(
    (order) => order.status !== "delivered" && order.status !== "canceled",
  );

  const completedOrders = allOrders.filter(
    (order) => order.status === "delivered" || order.status === "canceled",
  );

  const filteredOrders = allOrders.filter((order) => {
    if (historyFilter === "all") {
      return true;
    }

    if (historyFilter === "in_progress") {
      return order.status !== "delivered" && order.status !== "canceled";
    }

    return order.status === historyFilter;
  });

  function handleCarouselScroll(
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    const position = event.nativeEvent.contentOffset.x;

    scrollX.setValue(position);

    const index = Math.max(
      0,
      Math.min(Math.round(position / cardStep), activeOrders.length - 1),
    );

    setActiveIndex(index);

    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);

    snapTimeoutRef.current = setTimeout(() => {
      const target = index * cardStep;

      if (Math.abs(position - target) > 1) {
        carouselRef.current?.scrollTo({ x: target, animated: true });
      }
    }, 120);
  }

  function handleDotPress(index: number) {
    carouselRef.current?.scrollTo({ x: index * cardStep, animated: true });
    setActiveIndex(index);
  }

  function getStepRange(index: number) {
    return [(index - 1) * cardStep, index * cardStep, (index + 1) * cardStep];
  }

  function handleFilter() {
    setHistoryFilter((current) => {
      if (current === "all") {
        return "in_progress";
      }

      if (current === "in_progress") {
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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (loadError) {
    return (
      <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
        <View style={styles.center}>
          <Text style={styles.message_text}>{loadError}</Text>

          <Pressable
            style={styles.retry_button}
            onPress={reload}
            accessibilityRole="button"
          >
            <Text style={styles.retry_text}>Tentar novamente</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Pedidos</Text>

            <Text style={styles.subtitle}>
              {inProgressOrders.length} em andamento · {completedOrders.length}{" "}
              finalizados
            </Text>
          </View>

          <View style={styles.section_header}>
            <Text style={styles.section_title}>Em andamento</Text>

            {hasManyActive && (
              <Text style={styles.section_hint}>
                {currentIndex + 1} de {activeOrders.length} · Arraste →
              </Text>
            )}
          </View>

          <View style={styles.carousel}>
            {activeOrders.length > 0 ? (
              <>
                <Animated.ScrollView
                  ref={carouselRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  decelerationRate="fast"
                  snapToInterval={cardStep}
                  snapToAlignment="start"
                  disableIntervalMomentum
                  scrollEventThrottle={16}
                  onScroll={handleCarouselScroll}
                  contentContainerStyle={styles.carousel_content}
                >
                  {activeOrders.map((order, index) => (
                    <Animated.View
                      key={order.id}
                      style={{
                        width: cardWidth,
                        opacity: hasManyActive
                          ? scrollX.interpolate({
                              inputRange: getStepRange(index),
                              outputRange: [0.6, 1, 0.6],
                              extrapolate: "clamp",
                            })
                          : 1,
                        transform: [
                          {
                            scale: hasManyActive
                              ? scrollX.interpolate({
                                  inputRange: getStepRange(index),
                                  outputRange: [0.94, 1, 0.94],
                                  extrapolate: "clamp",
                                })
                              : 1,
                          },
                        ],
                      }}
                    >
                      <FeaturedOrder
                        order={order}
                        onPressDetails={handleOrderDetails}
                      />
                    </Animated.View>
                  ))}
                </Animated.ScrollView>

                {hasManyActive && (
                  <View style={styles.pagination}>
                    {activeOrders.map((order, index) => (
                      <Pressable
                        key={order.id}
                        onPress={() => handleDotPress(index)}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel={`Ver pedido ${index + 1} de ${activeOrders.length}`}
                        accessibilityState={{
                          selected: index === currentIndex,
                        }}
                      >
                        <Animated.View
                          style={[
                            styles.pagination_dot,
                            {
                              width: scrollX.interpolate({
                                inputRange: getStepRange(index),
                                outputRange: [6, 20, 6],
                                extrapolate: "clamp",
                              }),
                              backgroundColor: scrollX.interpolate({
                                inputRange: getStepRange(index),
                                outputRange: [
                                  colors.border,
                                  colors.primary,
                                  colors.border,
                                ],
                                extrapolate: "clamp",
                              }),
                            },
                          ]}
                        />
                      </Pressable>
                    ))}
                  </View>
                )}
              </>
            ) : (
              <View style={styles.carousel_content}>
                <View style={styles.empty_state}>
                  <Text style={styles.empty_text}>
                    Nenhum pedido em andamento.
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View style={styles.history_header}>
            <Text style={styles.section_title}>Histórico de pedidos</Text>

            <Pressable
              onPress={handleFilter}
              accessibilityRole="button"
              style={styles.filter_button}
            >
              <Text style={styles.filter_text}>
                {historyFilter === "all"
                  ? "Filtrar"
                  : historyFilter === "in_progress"
                    ? "Em andamento"
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
    </SafeAreaView>
  );
}
