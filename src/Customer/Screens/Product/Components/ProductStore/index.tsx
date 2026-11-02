import type { ProductStoreProps } from "@/Customer/Types/product";
import { colors } from "@/Shared/Styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "./styles";

export function ProductStore({ store }: ProductStoreProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatar_text}>{store.initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{store.name}</Text>

        <View style={styles.meta_row}>
          <Ionicons name="star" size={12} color={colors.warning} />
          <Text style={styles.meta_text}>
            {`${store.rating} · ${store.distance} · entrega em ${store.deliveryTime}`}
          </Text>
        </View>
      </View>

      <View style={[styles.status, !store.isOpen && styles.status_closed]}>
        <Text
          style={[
            styles.status_text,
            !store.isOpen && styles.status_text_closed,
          ]}
        >
          {store.isOpen ? "ABERTA" : "FECHADA"}
        </Text>
      </View>
    </View>
  );
}
