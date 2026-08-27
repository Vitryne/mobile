import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, ScrollView, Text, View } from "react-native";
import { colors, commonStyles } from "../../../../Shared/Styles/commonStyles";
import { RootStackParamList } from "../../../Types/navigation";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "PedidoConfirmado">;

const lojas = [
  { id: "1", nome: "Atelier Lua · 2 itens", status: "Aguardando confirmação" },
  { id: "2", nome: "Casa Verão · 1 item", status: "Aguardando confirmação" },
];

export function PedidoConfirmado({ navigation, route }: Props) {
  const { orderId } = route.params;

  return (
    <View style={commonStyles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.check_circle}>
          <Ionicons name="checkmark" size={40} color={colors.primary} />
        </View>

        <Text style={styles.title}>Pedido confirmado!</Text>
        <Text style={styles.subtitle}>
          Estamos avisando as lojas. Você receberá uma notificação assim que
          cada pedido for confirmado.
        </Text>

        <View style={[commonStyles.card, styles.protocol_card]}>
          <Text style={styles.protocolLabel}>PROTOCOLO</Text>
          <Text style={styles.protocol}>#{orderId}</Text>

          <View style={styles.divider} />

          {lojas.map((l) => (
            <View key={l.id} style={styles.store}>
              <View style={styles.store_thumb}>
                <Ionicons
                  name="storefront-outline"
                  size={16}
                  color={colors.primary}
                />
              </View>
              <View>
                <Text style={styles.store_name}>{l.nome}</Text>
                <Text style={styles.store_status}>{l.status}</Text>
              </View>
            </View>
          ))}
        </View>

        <Pressable style={styles.button} onPress={() => navigation.popToTop()}>
          <Text style={commonStyles.button_text}>Voltar ao início</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
