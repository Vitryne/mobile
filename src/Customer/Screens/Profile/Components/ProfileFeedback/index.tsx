import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { colors } from "../../../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

type ProfileFeedbackProps = {
  message: string;
  onClose: () => void;
};

export default function ProfileFeedback({
  message,
  onClose,
}: ProfileFeedbackProps) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Feather name="info" size={18} color={colors.primary} />

      <Text style={styles.message}>{message}</Text>

      <Pressable
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Fechar aviso"
        hitSlop={8}
      >
        <Feather name="x" size={18} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}
