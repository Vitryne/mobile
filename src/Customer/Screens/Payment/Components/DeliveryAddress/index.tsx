import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { DeliveryAddressProps } from "../../../../Types/payment";
import { styles } from "./styles";

export default function DeliveryAddress({
  address,
  onChange,
}: DeliveryAddressProps) {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Endereço de entrega</Text>
        <Pressable onPress={onChange} accessibilityRole="button">
          <Text style={styles.change}>Alterar</Text>
        </Pressable>
      </View>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Feather name="home" size={17} color={colors.primary} />
        </View>
        <View style={styles.info}>
          <View style={styles.line}>
            <Text style={styles.name}>
              {address ? "Endereço selecionado" : "Nenhum endereço selecionado"}
            </Text>
          </View>
          <Text style={styles.address} numberOfLines={2}>
            {address ?? "Selecione um endereço para receber o pedido."}
          </Text>
        </View>
      </View>
    </View>
  );
}
