import { Feather } from "@expo/vector-icons";
import {
    useNavigation,
    useRoute,
    type RouteProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../../Shared/Styles/commonStyles";
import type { CustomerStackParamList } from "../../../Types/navigation";

import ConfirmedSummary from "../Components/ConfirmedSummary";
import { styles } from "./styles";

type Navigation = NativeStackNavigationProp<CustomerStackParamList>;

type ConfirmedRoute = RouteProp<CustomerStackParamList, "OrderConfirmed">;

export function OrderConfirmed() {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<ConfirmedRoute>();

  const { protocol, total } = route.params;

  function handleTrackOrder() {
    Alert.alert(
      "Acompanhar pedido",
      "O acompanhamento do pedido ainda não foi implementado.",
    );
  }

  function handleContinueShopping() {
    navigation.navigate("Home");
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.success_circle_outer}>
          <View style={styles.success_circle_inner}>
            <Feather
              name="check"
              size={50}
              strokeWidth={3}
              color={colors.white}
            />
          </View>
        </View>

        <Text style={styles.title}>Pedido confirmado!</Text>

        <Text style={styles.description}>
          Pagamento aprovado. A loja vai confirmar e preparar seu pedido em até
          30 minutos.
        </Text>

        <ConfirmedSummary protocol={protocol} total={total} />

        <View style={styles.actions}>
          <Pressable
            style={styles.primary_button}
            onPress={handleTrackOrder}
            accessibilityRole="button"
          >
            <Feather name="file-text" size={16} color={colors.white} />

            <Text style={styles.primary_button_text}>Acompanhar pedido</Text>
          </Pressable>

          <Pressable
            style={styles.secondary_button}
            onPress={handleContinueShopping}
            accessibilityRole="button"
          >
            <Text style={styles.secondary_button_text}>
              Continuar comprando
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
