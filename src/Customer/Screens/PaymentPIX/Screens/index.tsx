import { Feather } from "@expo/vector-icons";
import {
    useNavigation,
    useRoute,
    type RouteProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Clipboard from "expo-clipboard";
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../../../Shared/Styles/commonStyles";
import { useOrders } from "../../../Context/ordersContext";
import type { CustomerStackParamList } from "../../../Types/navigation";

import PixCopyCode from "../Components/PixCopyCode";
import PixHeader from "../Components/PixHeader";
import PixInstructions from "../Components/PixInstructions";
import PixQRCode from "../Components/PixQRCode";
import PixStatus from "../Components/PixStatus";
import { styles } from "./styles";

const VALIDITY_MS = 15 * 60 * 1000;
const DOUBLE_TAP_INTERVAL = 350;

function createDemoCode() {
  return `VITRYNE-DEMO-PIX-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

function createProtocol() {
  return `#A-${Date.now().toString().slice(-8)}`;
}

export function PaymentPIX() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();

  const route = useRoute<RouteProp<CustomerStackParamList, "PaymentPIX">>();

  const { addConfirmedOrder } = useOrders();

  const lastTap = useRef(0);
  const confirming = useRef(false);

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
    if (!copied) {
      return;
    }

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const remainingSeconds = Math.max(0, Math.ceil((expiresAt - now) / 1000));

  const expired = remainingSeconds === 0;

  async function handleCopy() {
    if (expired || Date.now() >= expiresAt) {
      return;
    }

    try {
      await Clipboard.setStringAsync(pixCode);
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

    lastTap.current = 0;
    confirming.current = false;
  }

  function handleQRCodePress() {
    if (expired || Date.now() >= expiresAt || confirming.current) {
      return;
    }

    const currentTime = Date.now();
    const difference = currentTime - lastTap.current;

    if (difference > 0 && difference < DOUBLE_TAP_INTERVAL) {
      confirming.current = true;
      lastTap.current = 0;

      const protocol = createProtocol();

      addConfirmedOrder({
        protocol,
        total: route.params.amount,
        stores: route.params.stores,
      });

      navigation.replace("OrderConfirmed", {
        protocol,
        total: route.params.amount,
      });

      return;
    }

    lastTap.current = currentTime;
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

          <PixQRCode
            code={pixCode}
            expired={expired}
            onPress={handleQRCodePress}
          />

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
          Pagamento demonstrativo. O código PIX não é válido para transações
          bancárias.
        </Text>
      </ScrollView>

      {copied && !expired && (
        <View style={styles.toast} accessibilityRole="alert">
          <Feather name="check" size={16} color={colors.success} />

          <Text style={styles.toast_text}>Código PIX copiado</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
