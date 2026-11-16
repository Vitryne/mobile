import { Modal, Pressable, Text, View } from "react-native";

import { styles } from "./styles";

type ProfileLogoutModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ProfileLogoutModal({
  visible,
  onCancel,
  onConfirm,
}: ProfileLogoutModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel="Cancelar saída"
        />

        <View style={styles.container}>
          <Text style={styles.title}>Sair da conta?</Text>

          <Text style={styles.description}>
            Sua sacola fica salva neste aparelho.
          </Text>

          <View style={styles.actions}>
            <Pressable
              style={styles.cancel_button}
              onPress={onCancel}
              accessibilityRole="button"
            >
              <Text style={styles.cancel_text}>Cancelar</Text>
            </Pressable>

            <Pressable
              style={styles.confirm_button}
              onPress={onConfirm}
              accessibilityRole="button"
            >
              <Text style={styles.confirm_text}>Sair</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
