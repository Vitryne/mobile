import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { PaymentFooterProps } from "../../../..//Types/payment";
import { styles } from "./styles";

export default function PaymentFooter({ onConfirm }: PaymentFooterProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={onConfirm}
        accessibilityRole="button"
      >
        <Feather name="check" size={17} color={colors.white} />
        <Text style={styles.text}>Confirmar compra</Text>
      </Pressable>
    </View>
  );
}
