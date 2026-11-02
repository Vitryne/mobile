import type { PixQRCodeProps } from "@/Customer/Types/paymentPIX";
import { colors } from "@/Shared/Styles/commonStyles";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { styles } from "./styles";

export default function PixQRCode({ code, expired, onPress }: PixQRCodeProps) {
  return (
    <Pressable
      onPress={expired ? undefined : onPress}
      disabled={expired}
      accessibilityRole="button"
      accessibilityLabel="QR Code de pagamento PIX demonstrativo"
      accessibilityHint="Toque duas vezes para simular a confirmação"
      style={styles.card}
    >
      {!expired ? (
        <QRCode
          value={code}
          size={186}
          color={colors.text}
          backgroundColor={colors.card}
        />
      ) : (
        <View style={styles.expired_content}>
          <View style={styles.expired_icon_circle}>
            <Feather name="clock" size={25} color={colors.danger} />
          </View>

          <Text style={styles.expired_text}>Expirado</Text>
        </View>
      )}
    </Pressable>
  );
}
