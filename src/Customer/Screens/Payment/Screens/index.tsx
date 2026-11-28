import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "../../../../Shared/Components/ScreenHeader";
import { colors } from "../../../../Shared/Styles/commonStyles";
import { useCheckout } from "../../../Hooks/useCheckout";
import { useCheckoutReview } from "../../../Hooks/useCheckoutReview";
import type { CustomerStackParamList } from "../../../Types/navigation";
import type { PaymentMethod } from "../../../Types/payment";
import CheckoutIssues from "../Components/CheckoutIssues";
import DeliveryAddress from "../Components/DeliveryAddress";
import OrderSummary from "../Components/OrderSummary";
import PaymentFooter from "../Components/PaymentFooter";
import PaymentMethods from "../Components/PaymentMethods";

import { styles } from "./styles";

type Navigation = NativeStackNavigationProp<CustomerStackParamList, "Payment">;

export function Payment() {
  const navigation = useNavigation<Navigation>();

  const [method, setMethod] = useState<PaymentMethod>("pix");

  const { review, isLoading, loadError, reload } = useCheckoutReview();

  const { isSubmitting, confirmOrder } = useCheckout();

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeAddress() {
    navigation.navigate("AddressList", { mode: "order" });
  }

  function handleAddCoupon() {
    Alert.alert("Cupom", "A inclusão de cupons ainda não foi implementada.");
  }

  function handleSelectMethod(selectedMethod: PaymentMethod) {
    if (selectedMethod === "newCard") {
      navigation.navigate("PaymentCard");
      return;
    }

    setMethod(selectedMethod);
  }

  async function handleConfirmCard(reviewToken: string) {
    const result = await confirmOrder(reviewToken, "CREDIT_CARD");

    if (result.ok) {
      navigation.replace("OrderConfirmed", {
        protocol: result.order.protocol,
        total: result.order.total,
      });
      return;
    }

    if (result.reviewChanged) reload();

    Alert.alert("Não foi possível confirmar", result.message);
  }

  function handleConfirm() {
    if (!review?.canConfirm || !review.reviewToken) return;

    if (method === "pix") {
      navigation.navigate("PaymentPIX", {
        amount: review.total,
        reviewToken: review.reviewToken,
      });
      return;
    }

    if (method === "savedCard") {
      handleConfirmCard(review.reviewToken);
    }
  }

  if (isLoading || loadError || !review) {
    return (
      <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
        <ScreenHeader title="Pagamento" onBack={handleBack} />

        <View style={styles.center}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <>
              <Text style={styles.message_text}>
                {loadError ?? "Não foi possível revisar sua compra."}
              </Text>

              <Pressable
                style={styles.retry_button}
                onPress={reload}
                accessibilityRole="button"
              >
                <Text style={styles.retry_text}>Tentar novamente</Text>
              </Pressable>
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <ScreenHeader title="Pagamento" onBack={handleBack} />

      <View style={styles.content}>
        <DeliveryAddress
          address={review.address}
          onChange={handleChangeAddress}
        />

        <CheckoutIssues issues={review.issues} />

        <View style={styles.flexSections}>
          <View style={styles.paymentArea}>
            <PaymentMethods selected={method} onSelect={handleSelectMethod} />
          </View>

          <View style={styles.summaryArea}>
            <OrderSummary
              items={review.items}
              subtotal={review.subtotal}
              delivery={review.shipping}
              total={review.total}
              onCoupon={handleAddCoupon}
            />
          </View>
        </View>
      </View>

      <PaymentFooter
        onConfirm={handleConfirm}
        isLoading={isSubmitting}
        disabled={!review.canConfirm}
      />
    </SafeAreaView>
  );
}
