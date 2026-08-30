import { Text, View } from "react-native";
import { styles } from "./styles";

type PasswordStrengthProps = {
  score: number;
};

const LEVELS = [
  { label: "Fraca", color: "#EF4444" },
  { label: "Média", color: "#F59E0B" },
  { label: "Forte", color: "#16A34A" },
];

export function PasswordStrength({ score }: PasswordStrengthProps) {
  if (score === 0) return null;

  const level = LEVELS[score - 1];

  return (
    <View style={styles.container}>
      <View style={styles.bars}>
        {LEVELS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              index < score && { backgroundColor: level.color },
            ]}
          />
        ))}
      </View>

      <Text style={[styles.label, { color: level.color }]}>{level.label}</Text>
    </View>
  );
}
