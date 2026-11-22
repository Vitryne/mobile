import type { CustomerStackParamList } from "@/Customer/Types/navigation";
import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../../Hooks/useCart";
import CartFooter from "../Components/CartFooter";
import CartHeader from "../Components/CartHeader";
import CartItemList from "../Components/CartItemList";
import EmptyCart from "../Components/EmptyCart";
import RemoveModal from "../Components/RemoveModal";
import { styles } from "./styles";

export function Cart() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
  const cart = useCart();

  function handleBack() {
    navigation.goBack();
  }

  function handleExplore() {
    navigation.navigate("MainTabs", { screen: "Home" });
  }

  function handleChangeAddress() {}

  function handleAddCoupon() {}

  function handleCheckout() {
    navigation.navigate("Payment", { items: cart.items, total: cart.total });
  }

  function renderContent() {
    if (cart.isLoading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (cart.loadError) {
      return (
        <View style={styles.center}>
          <Text style={styles.message_text}>{cart.loadError}</Text>
          <TouchableOpacity style={styles.retry_button} onPress={cart.reload}>
            <Text style={styles.retry_text}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (cart.isEmpty) {
      return <EmptyCart onExplore={handleExplore} />;
    }

    return (
      <>
        <ScrollView
          contentContainerStyle={commonStyles.scroll_content}
          showsVerticalScrollIndicator={false}
        >
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

          {cart.updateError && (
            <Text style={styles.error_text}>{cart.updateError}</Text>
          )}

          <CartItemList
            items={cart.items}
            onIncrease={cart.increase}
            onDecrease={cart.decrease}
          />

          <TouchableOpacity style={styles.coupon_row} onPress={handleAddCoupon}>
            <Ionicons
              name="pricetag-outline"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.coupon_text}>Adicionar cupom de desconto</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </TouchableOpacity>
        </ScrollView>

        <CartFooter total={cart.total} onContinue={handleCheckout} />
      </>
    );
  }

  return (
    <SafeAreaView style={commonStyles.screen}>
      <CartHeader
        itemCount={cart.itemCount}
        showClear={!cart.isLoading && !cart.loadError && !cart.isEmpty}
        onBack={handleBack}
        onClear={cart.clearAll}
      />

      {renderContent()}

      <RemoveModal
        item={cart.itemToRemove}
        onCancel={cart.cancelRemove}
        onConfirm={cart.confirmRemove}
      />
    </SafeAreaView>
  );
}
