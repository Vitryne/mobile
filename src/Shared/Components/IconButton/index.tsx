import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type IconButtonProps = {
  icon: ReactNode;
  onPress?: () => void;
  accessibilityLabel: string;
  badge?: number;
  disabled?: boolean;
};

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  badge,
  disabled = false,
}: IconButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      {icon}

      {!!badge && (
        <View style={styles.badge}>
          <Text style={styles.badge_text}>{badge}</Text>
        </View>
      )}
    </Pressable>
  );
}
