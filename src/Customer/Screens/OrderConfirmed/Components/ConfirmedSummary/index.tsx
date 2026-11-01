import type { OrderConfirmedSummaryProps } from "@/Customer/Types/orderConfirmed";
import { formatPrice } from "@/Shared/Utils/formatPrice";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function ConfirmedSummary({
  protocol,
  total,
}: OrderConfirmedSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.label}>PROTOCOLO</Text>
        <Text style={styles.value}>{protocol}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.info}>
        <Text style={styles.label}>TOTAL</Text>
        <Text style={styles.value}>{formatPrice(total)}</Text>
      </View>
    </View>
  );
}
