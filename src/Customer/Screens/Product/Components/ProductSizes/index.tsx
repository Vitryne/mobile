import type { ProductSizesProps } from "@/Customer/Types/product";
import { colors } from "@/Shared/Styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export function ProductSizes({
  sizes,
  selectedSize,
  lowStockMessage,
  onSelect,
  onOpenSizeTable,
}: ProductSizesProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tamanho</Text>

        <TouchableOpacity activeOpacity={0.8} onPress={onOpenSizeTable}>
          <Text style={styles.link}>Tabela de medidas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sizes_row}>
        {sizes.map((size) => {
          const isSelected = size.label === selectedSize;

          return (
            <TouchableOpacity
              key={size.label}
              activeOpacity={0.8}
              disabled={!size.available}
              onPress={() => onSelect(size.label)}
              style={[
                styles.size_button,
                isSelected && styles.size_button_selected,
                !size.available && styles.size_button_disabled,
              ]}
            >
              <Text
                style={[
                  styles.size_text,
                  isSelected && styles.size_text_selected,
                ]}
              >
                {size.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.warning_row}>
        <Ionicons name="hourglass-outline" size={14} color={colors.warning} />
        <Text style={styles.warning_text}>{lowStockMessage}</Text>
      </View>
    </View>
  );
}
