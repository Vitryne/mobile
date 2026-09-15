import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type SecundaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function SecundaryButton({
  label,
  onPress,
  disabled = false,
}: SecundaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.container_disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
