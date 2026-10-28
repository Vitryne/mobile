import { PrimaryButton } from "@/Customer/Components/PrimaryButton";
import { formatPrice } from "@/Shared/Utils/formatPrice";
import { Text, View } from "react-native";
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

      <View style={styles.button_wrapper}>
        <PrimaryButton label="Continuar para pagamento" onPress={onContinue} />
      </View>
    </View>
  );
}
