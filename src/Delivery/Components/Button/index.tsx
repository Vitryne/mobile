import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function Button({
  label,
  onPress,
  disabled = false,
}: PrimaryButtonProps) {
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
