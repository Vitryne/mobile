import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";

import { colors } from "../../../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

type ProfileEditModalProps = {
  visible: boolean;
  initials: string;
  avatarColor: string;
  onChangePhoto: () => void;
  onCancel: () => void;
  onSave: () => void;
};

export default function ProfileEditModal({
  visible,
  initials,
  avatarColor,
  onChangePhoto,
  onCancel,
  onSave,
}: ProfileEditModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel="Fechar edição"
        />

        <View style={styles.container}>
          <View style={styles.handle} />

          <View style={styles.content}>
            <View style={styles.avatar_wrapper}>
              <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
                <Text style={styles.avatar_text}>{initials}</Text>
              </View>

              <View style={styles.edit_icon}>
                <Feather name="edit-2" size={13} color={colors.white} />
              </View>
            </View>

            <Pressable
              onPress={onChangePhoto}
              style={styles.change_photo_button}
              accessibilityRole="button"
            >
              <Text style={styles.change_photo_text}>Trocar foto</Text>
            </Pressable>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={styles.cancel_button}
              onPress={onCancel}
              accessibilityRole="button"
            >
              <Text style={styles.cancel_text}>Cancelar</Text>
            </Pressable>

            <Pressable
              style={styles.save_button}
              onPress={onSave}
              accessibilityRole="button"
            >
              <Text style={styles.save_text}>Salvar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
