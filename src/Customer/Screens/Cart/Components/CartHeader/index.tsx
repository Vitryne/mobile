import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

type Props = {
  itemCount: number;
  storeCount: number;
  showClear: boolean;
  onBack: () => void;
  onClear: () => void;
};

export default function CartHeader({
  itemCount,
  storeCount,
  showClear,
  onBack,
  onClear,
}: Props) {
  const itemLabel = itemCount === 1 ? "item" : "itens";
  const storeLabel = storeCount === 1 ? "loja" : "lojas";

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back_button} onPress={onBack}>
        <Ionicons name="arrow-back" size={20} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.title_block}>
        <Text style={styles.title}>Sacola</Text>
        <Text style={styles.subtitle}>
          {itemCount} {itemLabel} · {storeCount} {storeLabel}
        </Text>
      </View>

      {showClear && (
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.clear_text}>Limpar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
