import type { CustomerStackParamList } from "@/Customer/Types/navigation";
import { ScreenHeader } from "@/Shared/Components/ScreenHeader";
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
import { useAddresses } from "../../../Hooks/useAddresses";
import { useCart } from "../../../Hooks/useCart";
import { useRestoreDefaultAddressOnLeave } from "../../../Hooks/useOrderAddress";
import CartFooter from "../Components/CartFooter";
import CartItemList from "../Components/CartItemList";
import EmptyCart from "../Components/EmptyCart";
import RemoveModal from "../Components/RemoveModal";
import { styles } from "./styles";

export function Cart() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
  const cart = useCart();
  useRestoreDefaultAddressOnLeave();
  const { selectedAddress } = useAddresses();

  const addressLabel = selectedAddress
    ? [selectedAddress.street, selectedAddress.number]
        .filter(Boolean)
        .join(", ")
    : null;

  const showClear = !cart.isLoading && !cart.loadError && !cart.isEmpty;

  function handleBack() {
    navigation.goBack();
  }

  function handleExplore() {
    navigation.navigate("MainTabs", { screen: "Home" });
  }

  function handleChangeAddress() {
    navigation.navigate("AddressList", { mode: "order" });
  }

  function handleAddCoupon() {}

  function handleCheckout() {
    navigation.navigate("Payment");
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
              {addressLabel ? (
                <>
                  Entregar em{" "}
                  <Text style={styles.address_bold}>{addressLabel}</Text>
                </>
              ) : (
                "Selecione um endereço"
              )}
            </Text>
            <TouchableOpacity onPress={handleChangeAddress}>
              <Text style={styles.link_text}>Alterar</Text>
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

        <CartFooter
          subtotal={cart.subtotal}
          delivery={cart.delivery}
          total={cart.total}
          onContinue={handleCheckout}
        />
      </>
    );
  }

  return (
    <SafeAreaView
      style={commonStyles.screen}
      edges={["bottom", "left", "right"]}
    >
      <ScreenHeader
        title="Sacola"
        subtitle={`${cart.itemCount} ${cart.itemCount === 1 ? "item" : "itens"}`}
        onBack={handleBack}
        right={
          showClear ? (
            <TouchableOpacity onPress={cart.clearAll}>
              <Text style={styles.clear_text}>Limpar</Text>
            </TouchableOpacity>
          ) : null
        }
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
