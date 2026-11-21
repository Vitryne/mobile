import { formatPrice } from "@/Shared/Utils/formatPrice";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  total: number;
  onContinue: () => void;
};

export default function CartFooter({ total, onContinue }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Entrega</Text>
        <Text style={styles.value}>Calculada no pagamento</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.total_label}>Total</Text>
        <Text style={styles.total_value}>{formatPrice(total)}</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={onContinue}
        accessibilityRole="button"
      >
        <Text style={styles.button_text}>Continuar para pagamento</Text>
      </Pressable>
    </View>
  );
}
