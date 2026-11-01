import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { PixCopyCodeProps } from "../../../../Types/paymentPIX";
import { styles } from "./styles";

export default function PixCopyCode({
  code,
  copied,
  expired,
  onCopy,
  onRenew,
}: PixCopyCodeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.field_label}>PIX COPIA E COLA</Text>

      <View style={[styles.code_box, expired && styles.disabled_box]}>
        <Text
          style={[styles.code_text, expired && styles.disabled_text]}
          numberOfLines={1}
          selectable={!expired}
        >
          {code}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={expired ? "Gerar novo código" : "Copiar código PIX"}
        onPress={expired ? onRenew : onCopy}
        style={[styles.button, copied && !expired && styles.copied_button]}
      >
        <Feather
          name={expired ? "grid" : copied ? "check" : "link"}
          size={16}
          color={copied && !expired ? colors.success : colors.primary}
        />

        <Text
          style={[styles.button_text, copied && !expired && styles.copied_text]}
        >
          {expired
            ? "Gerar novo código"
            : copied
              ? "Código copiado"
              : "Copiar código PIX"}
        </Text>
      </Pressable>
    </View>
  );
}
