import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { fmt, useMenuCarrinho } from "../../../Hooks/cartMenu";
import { colors, commonStyles } from "../../../Styles/commonStyles";
import { RootStackParamList } from "../../../Types/navigation";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "MenuCarrinho">;

export function MenuCarrinho({ navigation }: Props) {
  const {
    cart,
    hasUnavailable,
    subtotal,
    totalDelivery,
    total,
    storesWithDelivery,
    updateQty,
    removeUnavailable,
    DISCOUNT,
  } = useMenuCarrinho();

  return (
    <View style={commonStyles.screen}>
      <ScrollView
        contentContainerStyle={styles.scroll_content}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner indisponível */}
        {hasUnavailable && (
          <View style={styles.warning_banner}>
            <Ionicons
              name="alert-circle-outline"
              size={18}
              color={colors.danger}
              style={{ marginTop: 1 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.warning_text}>
                1 item ficou indisponível desde que você adicionou.
              </Text>
              <Pressable onPress={removeUnavailable}>
                <Text style={styles.warning_link}>Remover</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Cards por loja */}
        {cart.map((store) => (
          <View key={store.id} style={styles.store_card}>
            <View style={styles.store_header}>
              <View style={styles.store_icon_box}>
                <Ionicons
                  name="storefront-outline"
                  size={16}
                  color={colors.primary}
                />
              </View>
              <View>
                <Text style={styles.store_name}>{store.name}</Text>
                <Text style={styles.store_delivery}>
                  Entrega em {store.deliveryTime} · Frete{" "}
                  {fmt(store.deliveryFee)}
                </Text>
              </View>
            </View>

            {store.items.map((item, idx) => (
              <View
                key={item.id}
                style={[styles.item_row, idx > 0 && styles.item_divider]}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={[
                    styles.item_img,
                    item.unavailable && styles.item_img_unavailable,
                  ]}
                />
                <View style={styles.item_info}>
                  <View style={styles.item_name_row}>
                    <Text style={styles.item_name} numberOfLines={2}>
                      {item.name}
                    </Text>
                    {item.unavailable && (
                      <View style={styles.unavailable_badge}>
                        <Text style={styles.unavailable_badge_text}>
                          INDISPONÍVEL
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.item_size}>Tamanho {item.size}</Text>
                  <View style={styles.item_footer}>
                    <View style={styles.qty}>
                      <Pressable
                        style={styles.qty_btn_outline}
                        onPress={() => updateQty(store.id, item.id, -1)}
                        disabled={item.unavailable}
                        hitSlop={8}
                      >
                        <Text style={styles.qty_btn_outline_text}>−</Text>
                      </Pressable>
                      <Text style={styles.qty_num}>{item.quantity}</Text>
                      <Pressable
                        style={styles.qty_btn_filled}
                        onPress={() => updateQty(store.id, item.id, +1)}
                        disabled={item.unavailable}
                        hitSlop={8}
                      >
                        <Text style={styles.qty_btn_filled_text}>+</Text>
                      </Pressable>
                    </View>
                    <Text style={styles.item_price}>{fmt(item.price)}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}

        {/* Resumo */}
        <View style={styles.summary_section}>
          <View style={styles.sum_row}>
            <Text style={styles.sum_label}>Subtotal</Text>
            <Text style={styles.sum_val}>{fmt(subtotal)}</Text>
          </View>
          <View style={styles.sum_row}>
            <Text style={styles.sum_label}>
              Fretes ({storesWithDelivery.length} lojas)
            </Text>
            <Text style={styles.sum_val}>{fmt(totalDelivery)}</Text>
          </View>
          <View style={styles.sum_row}>
            <Text style={styles.sum_label}>Desconto</Text>
            <Text style={styles.sum_discount}>- {fmt(DISCOUNT)}</Text>
          </View>
          <View style={styles.sum_total_row}>
            <Text style={styles.sum_total_label}>Total</Text>
            <Text style={styles.sum_total_val}>{fmt(total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View style={styles.cta_area}>
        <Pressable
          style={styles.cta_btn}
          onPress={() => navigation.navigate("Endereco")}
        >
          <Text style={styles.cta_text}>Ir para o checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}
