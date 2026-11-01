import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { PaymentHeaderProps } from "../../../..//Types/payment";
import { styles } from "./styles";

export default function PaymentHeader({ onBack }: PaymentHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.back}
        onPress={onBack}
        accessibilityLabel="Voltar"
        accessibilityRole="button"
      >
        <Feather name="arrow-left" size={18} color={colors.text} />
      </Pressable>
      <Text style={styles.title}>Pagamento</Text>
    </View>
  );
}
