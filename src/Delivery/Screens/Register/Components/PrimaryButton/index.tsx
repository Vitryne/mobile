import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function PrimaryButton({
  label,
  onPress,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.containerDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Feather name="arrow-right" size={18} color="#FFFFFF" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
