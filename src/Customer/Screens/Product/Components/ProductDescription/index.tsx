import type { ProductDescriptionProps } from "@/Customer/Types/product";
import { Text, View } from "react-native";
import { styles } from "./styles";

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Descrição</Text>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
