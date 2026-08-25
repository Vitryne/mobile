import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, ScrollView, Text, View } from "react-native";
import { commonStyles } from "../../../../Styles/commonStyles";
import { RootStackParamList } from "../../../../Types/navigation";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "PaguePix">;

const codigoPix = "00020126360014BR.GOV.BCB.PIX0114+5511996412...";

export function PaguePix({ navigation, route }: Props) {
  const { orderId } = route.params;

  return (
    <View style={commonStyles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.expire_label}>EXPIRA EM</Text>
        <Text style={styles.timer}>27:42</Text>

        {/* QR mock — aqui entraria <QRCode value={codigoPix} /> */}
        <View style={styles.qr}>
          <Text style={styles.qrText}>QR Code</Text>
        </View>

        <Text style={styles.total_label}>Total a pagar</Text>
        <Text style={styles.total_value}>R$ 341,91</Text>

        <View style={styles.code_row}>
          <Text style={styles.code} numberOfLines={1}>
            {codigoPix}
          </Text>
          <Pressable style={styles.copy_btn}>
            <Text style={styles.copy_text}>Copiar</Text>
          </Pressable>
        </View>

        <Text style={styles.hint}>
          Após o pagamento, você é redirecionado automaticamente.{"\n"}Não feche
          este app.
        </Text>

        {/* botão mock pra simular o pagamento concluído */}
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("PedidoConfirmado", { orderId })}
        >
          <Text style={commonStyles.button_text}>Simular pagamento</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
