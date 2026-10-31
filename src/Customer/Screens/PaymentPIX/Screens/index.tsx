import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    useNavigation,
    useRoute,
    type RouteProp,
} from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "../../../../Shared/Styles/commonStyles";
import type { CustomerStackParamList } from "../../../Types/navigation";

import PixCopyCode from "../Components/PixCopyCode";
import PixHeader from "../Components/PixHeader";
import PixInstructions from "../Components/PixInstructions";
import PixQRCode from "../Components/PixQRCode";
import PixStatus from "../Components/PixStatus";
import { styles } from "./styles";

const VALIDITY_MS = 15 * 60 * 1000;

function createDemoCode() {
  return `VITRYNE-DEMO-PIX-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export function PaymentPIX() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();

  const route = useRoute<RouteProp<CustomerStackParamList, "PaymentPIX">>();

  const [pixCode, setPixCode] = useState(createDemoCode);
  const [expiresAt, setExpiresAt] = useState(() => Date.now() + VALIDITY_MS);
  const [now, setNow] = useState(Date.now());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => setCopied(false), 3000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const remainingSeconds = Math.max(0, Math.ceil((expiresAt - now) / 1000));

  const expired = remainingSeconds === 0;

  async function handleCopy() {
    if (expired) return;

    try {
      const copiedSuccessfully = await Clipboard.setStringAsync(pixCode);

      if (copiedSuccessfully === false) {
        throw new Error("Falha ao copiar");
      }

      setCopied(true);
    } catch {
      Alert.alert("Não foi possível copiar", "Tente novamente.");
    }
  }

  function handleRenew() {
    const currentTime = Date.now();

    setPixCode(createDemoCode());
    setExpiresAt(currentTime + VALIDITY_MS);
    setNow(currentTime);
    setCopied(false);
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <PixHeader onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.main_content}>
          <PixStatus
            amount={route.params.amount}
            expired={expired}
            remainingSeconds={remainingSeconds}
          />

          <PixQRCode code={pixCode} expired={expired} />

          <PixCopyCode
            code={pixCode}
            copied={copied}
            expired={expired}
            onCopy={handleCopy}
            onRenew={handleRenew}
          />

          <PixInstructions />
        </View>

        <Text style={styles.demo_label}>
          Demonstração: o QR Code e o código acima não são válidos para
          pagamentos bancários.
        </Text>
      </ScrollView>

      {copied && !expired && (
        <View style={styles.toast} accessibilityRole="alert">
          <Feather name="check" color={colors.success} size={16} />

          <Text style={styles.toast_text}>Código Copia e Cola copiado</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
