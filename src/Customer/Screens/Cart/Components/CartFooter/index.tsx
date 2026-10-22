import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { formatPrice } from "../../../../../Shared/Utils/formatPrice";
import { styles } from "./styles";

type Props = {
  subtotal: number;
  delivery: number;
  total: number;
  onContinue: () => void;
};

export default function CartFooter({
  subtotal,
  delivery,
  total,
  onContinue,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>{formatPrice(subtotal)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Entrega</Text>
        <Text style={styles.value}>{formatPrice(delivery)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.total_label}>Total</Text>
        <Text style={styles.total_value}>{formatPrice(total)}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.button_text}>Continuar para pagamento</Text>
        <Ionicons name="arrow-forward" size={18} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
