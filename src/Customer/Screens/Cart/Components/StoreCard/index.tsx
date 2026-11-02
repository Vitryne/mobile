import type { CartItem, CartStore } from "@/Customer/Hooks/useCart";
import { formatPrice } from "@/Shared/Utils/formatPrice";
import { Image, Text, View } from "react-native";
import CartItemRow from "../CartItemRow";
import { styles } from "./styles";

type Props = {
  store: CartStore;
  onIncrease: (itemId: string) => void;
  onDecrease: (item: CartItem) => void;
};

export default function StoreCard({ store, onIncrease, onDecrease }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={store.logo} style={styles.logo} resizeMode="cover" />
        <View>
          <Text style={styles.store_name}>{store.name}</Text>
          <Text style={styles.delivery_info}>
            Entrega em {store.deliveryTime} · frete{" "}
            {formatPrice(store.deliveryFee)}
          </Text>
        </View>
      </View>

      {store.items.map((item) => (
        <View key={item.id}>
          <View style={styles.divider} />
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
