import { Text, View } from "react-native";
import { styles } from "./styles";

type StepBadgeProps = {
  label: string;
};

export function StepBadge({ label }: StepBadgeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}
