import type { CartItem } from "@/Customer/Hooks/useCart";
import { colors } from "@/Shared/Styles/commonStyles";
import { formatPrice } from "@/Shared/Utils/formatPrice";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Props = {
  item: CartItem;
  onIncrease: (itemId: string) => void;
  onDecrease: (item: CartItem) => void;
};

export default function CartItemRow({ item, onIncrease, onDecrease }: Props) {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />

      <View style={styles.info}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.size}>Tamanho {item.size}</Text>
        </View>

        <View style={styles.bottom_row}>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepper_button}
              onPress={() => onDecrease(item)}
            >
              <Ionicons name="remove" size={16} color={colors.text} />
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.stepper_button}
              onPress={() => onIncrease(item.id)}
            >
              <Ionicons name="add" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>
            {formatPrice(item.price * item.quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
}
