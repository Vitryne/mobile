import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { PaymentFooterProps } from "../../../..//Types/payment";
import { styles } from "./styles";

export default function PaymentFooter({
  onConfirm,
  isLoading = false,
  disabled = false,
}: PaymentFooterProps) {
  const isDisabled = isLoading || disabled;

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, isDisabled && styles.button_disabled]}
        onPress={onConfirm}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityState={{ busy: isLoading, disabled: isDisabled }}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <>
            <Feather name="check" size={17} color={colors.white} />
            <Text style={styles.text}>Confirmar compra</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
