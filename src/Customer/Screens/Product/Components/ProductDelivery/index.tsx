import type { ProductDeliveryProps } from "@/Customer/Types/product";
import { colors } from "@/Shared/Styles/commonStyles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function ProductDelivery({
  title,
  address,
  fee,
  onPress,
}: ProductDeliveryProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.icon_box}>
        <Feather name="truck" size={20} color={colors.text} />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>
          {`${address} · Frete `}
          <Text style={styles.fee}>{fee}</Text>
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </TouchableOpacity>
  );
}
