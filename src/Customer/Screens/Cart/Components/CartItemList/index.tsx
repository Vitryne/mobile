import type { CartItem } from "@/Customer/Types/cart";
import { View } from "react-native";
import CartItemRow from "../CartItemRow";
import { styles } from "./styles";

type Props = {
  items: CartItem[];
  onIncrease: (item: CartItem) => void;
  onDecrease: (item: CartItem) => void;
};

export default function CartItemList({ items, onIncrease, onDecrease }: Props) {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={item.id}>
          {index > 0 && <View style={styles.divider} />}
          <CartItemRow
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        </View>
      ))}
    </View>
  );
}
