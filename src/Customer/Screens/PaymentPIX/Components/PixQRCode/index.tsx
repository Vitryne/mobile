import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { PixQRCodeProps } from "../../../../Types/paymentPIX";
import { styles } from "./styles";

export default function PixQRCode({ code, expired }: PixQRCodeProps) {
  return (
    <View style={styles.card}>
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
    </View>
  );
}
