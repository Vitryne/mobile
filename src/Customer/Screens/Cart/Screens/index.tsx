import type { CustomerStackParamList } from "@/Customer/Types/navigation";
import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../../Hooks/useCart";
import CartFooter from "../Components/CartFooter";
import CartHeader from "../Components/CartHeader";
import EmptyCart from "../Components/EmptyCart";
import RemoveModal from "../Components/RemoveModal";
import StoreCard from "../Components/StoreCard";
import { mockStores } from "../mockCart";
import { styles } from "./styles";

export function Cart() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
  const cart = useCart(mockStores);

  function handleBack() {
    navigation.goBack();
  }

  function handleExplore() {
    navigation.navigate("Home");
  }

  function handleChangeAddress() {}

  function handleAddCoupon() {}

  function handleCheckout() {
    navigation.navigate("Payment", { stores: cart.stores });
  }

  return (
    <SafeAreaView style={commonStyles.screen}>
      <CartHeader
        itemCount={cart.itemCount}
        storeCount={cart.storeCount}
        showClear={!cart.isEmpty}
        onBack={handleBack}
        onClear={cart.clearAll}
      />

      {cart.isEmpty ? (
        <EmptyCart onExplore={handleExplore} />
      ) : (
        <>
          <ScrollView contentContainerStyle={commonStyles.scroll_content}>
            <View style={styles.address_banner}>
              <Ionicons
                name="location-outline"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.address_text} numberOfLines={1}>
                Entregar em{" "}
                <Text style={styles.address_bold}>Rua das Palmeiras, 218</Text>
              </Text>
              <TouchableOpacity onPress={handleChangeAddress}>
                <Text style={styles.link_text}>Trocar</Text>
              </TouchableOpacity>
            </View>

            {cart.stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onIncrease={cart.increase}
                onDecrease={cart.decrease}
              />
            ))}

            <TouchableOpacity
              style={styles.coupon_row}
              onPress={handleAddCoupon}
            >
              <Ionicons
                name="pricetag-outline"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.coupon_text}>
                Adicionar cupom de desconto
              </Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </ScrollView>

          <CartFooter
            subtotal={cart.subtotal}
            delivery={cart.delivery}
            total={cart.total}
            onContinue={handleCheckout}
          />
        </>
      )}

      <RemoveModal
        item={cart.itemToRemove}
        onCancel={cart.cancelRemove}
        onConfirm={cart.confirmRemove}
      />
    </SafeAreaView>
  );
}
