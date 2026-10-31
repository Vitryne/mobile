import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { formatPrice } from "../../../../../Shared/Utils/formatPrice";
import type { PixStatusProps } from "../../../../Types/paymentPIX";
import { styles } from "./styles";

export default function PixStatus({
  amount,
  expired,
  remainingSeconds,
}: PixStatusProps) {
  const mm = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const ss = String(remainingSeconds % 60).padStart(2, "0");

  return (
    <View style={styles.container}>
      <View style={[styles.badge, expired && styles.badge_expired]}>
        <Feather
          name={expired ? "x" : "clock"}
          size={13}
          color={expired ? colors.danger : colors.warning}
        />

        <Text style={[styles.badge_text, expired && styles.text_expired]}>
          {expired ? "Código expirado" : `Expira em ${mm}:${ss}`}
        </Text>
      </View>

      <Text style={styles.label}>Escaneie para pagar</Text>
      <Text style={styles.amount}>{formatPrice(amount)}</Text>
    </View>
  );
}
