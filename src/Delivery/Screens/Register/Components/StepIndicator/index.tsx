import { View } from "react-native";
import { styles } from "./styles";

type StepIndicatorProps = {
  currentStep: number;
  totalSteps?: number;
};

export function StepIndicator({
  currentStep,
  totalSteps = 4,
}: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[styles.step, index < currentStep && styles.stepActive]}
        />
      ))}
    </View>
  );
}
