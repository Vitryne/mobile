import {
    useNavigation,
    useRoute,
    type RouteProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CustomerStackParamList } from "../../../Types/navigation";
import type { PaymentMethod } from "../../../Types/payment";
import DeliveryAddress from "../Components/DeliveryAddress";
import OrderSummary from "../Components/OrderSummary";
import PaymentFooter from "../Components/PaymentFooter";
import PaymentHeader from "../Components/PaymentHeader";
import PaymentMethods from "../Components/PaymentMethods";

import { styles } from "./styles";

type Navigation = NativeStackNavigationProp<CustomerStackParamList, "Payment">;

type PaymentRoute = RouteProp<CustomerStackParamList, "Payment">;

export function Payment() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<PaymentRoute>();

  const [method, setMethod] = useState<PaymentMethod>("pix");

  const stores = route.params.stores;

  const subtotal = stores.reduce(
    (sum, store) =>
      sum +
      store.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    0,
  );

  const delivery = stores.reduce((sum, store) => sum + store.deliveryFee, 0);

  const discount = method === "pix" ? subtotal * 0.05 : 0;

  const total = subtotal + delivery - discount;

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeAddress() {
    Alert.alert(
      "Endereço",
      "A alteração de endereço ainda não foi implementada.",
    );
  }

  function handleAddCoupon() {
    Alert.alert("Cupom", "A inclusão de cupons ainda não foi implementada.");
  }

  function handleConfirm() {
    if (method === "newCard") {
      Alert.alert(
        "Novo cartão",
        "O cadastro de cartão ainda não foi implementado.",
      );
      return;
    }

    Alert.alert(
      "Pagamento",
      "Esta é uma tela de demonstração. Nenhuma compra foi realizada.",
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <PaymentHeader onBack={handleBack} />

      <View style={styles.content}>
        <DeliveryAddress onChange={handleChangeAddress} />

        <View style={styles.flexSections}>
          <View style={styles.paymentArea}>
            <PaymentMethods selected={method} onSelect={setMethod} />
          </View>

          <View style={styles.summaryArea}>
            <OrderSummary
              stores={stores}
              subtotal={subtotal}
              delivery={delivery}
              discount={discount}
              total={total}
              onCoupon={handleAddCoupon}
            />
          </View>
        </View>
      </View>

      <PaymentFooter onConfirm={handleConfirm} />
    </SafeAreaView>
  );
}
