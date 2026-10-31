import { Text, View } from "react-native";
import { styles } from "./styles";

const STEPS = [
  "Abra o app do seu banco",
  "Escolha pagar via PIX com QR Code",
  "Aponte a câmera ou cole o código",
  "Confirme o valor e finalize",
];

export default function PixInstructions() {
  return (
    <View style={styles.card}>
      {STEPS.map((step, index) => (
        <View style={styles.row} key={step}>
          <View style={styles.badge}>
            <Text style={styles.number}>{index + 1}</Text>
          </View>

          <Text style={styles.text}>{step}</Text>
        </View>
      ))}
    </View>
  );
}
