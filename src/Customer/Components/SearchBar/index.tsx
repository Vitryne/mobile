import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Pressable, TextInput, View } from "react-native";
import { colors } from "../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  onPressFilter?: () => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChangeText,
  onSubmitEditing,
  onPressFilter,
  placeholder = "Buscar peças, lojas ou marcas",
}: SearchBarProps) {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Feather name="search" size={18} color={colors.textMuted} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor="#9A9A9A"
        returnKeyType="search"
        style={styles.input}
      />

      {route.name === "Home" && (
        <Pressable
          onPress={onPressFilter}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Filtros"
        >
          <MaterialIcons name="filter-list" size={22} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
}
