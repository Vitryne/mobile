import { Text, View } from "react-native";
import { styles } from "./styles";

type StepperProps = {
  passos: string[];
  stepAtual: number;
};

export function Stepper({ passos, stepAtual }: StepperProps) {
  return (
    <View style={styles.stepper}>
      {passos.map((label, i) => {
        const ativo = i <= stepAtual;
        const linhaAtiva = i < stepAtual;
        const ehUltimo = i === passos.length - 1;
        return (
          <View key={label} style={[styles.step, { flex: ehUltimo ? 0 : 1 }]}>
            <View
              style={[
                styles.step_badge,
                ativo ? styles.step_badge_active : styles.step_badge_idle,
              ]}
            >
              <Text style={styles.step_badge_text}>{i + 1}</Text>
            </View>
            <Text
              style={[styles.step_label, ativo && styles.step_label_active]}
            >
              {label}
            </Text>
            {!ehUltimo && (
              <View
                style={[
                  styles.step_line,
                  linhaAtiva && styles.step_line_active,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
