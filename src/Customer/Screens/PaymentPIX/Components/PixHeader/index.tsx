import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { PixHeaderProps } from "../../../../Types/paymentPIX";
import { styles } from "./styles";

export default function PixHeader({ onBack }: PixHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onBack}
        style={styles.back}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <Feather name="arrow-left" size={20} color={colors.text} />
      </Pressable>
      <Text style={styles.title}>Pagamento PIX</Text>
    </View>
  );
}
