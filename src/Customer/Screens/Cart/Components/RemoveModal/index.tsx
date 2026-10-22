import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { CartItem } from "../../../../Hooks/useCart";
import { styles } from "./styles";

type Props = {
  item: CartItem | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function RemoveModal({ item, onCancel, onConfirm }: Props) {
  return (
    <Modal
      visible={item !== null}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.header_text}>
              <Text style={styles.title}>Remover da sacola?</Text>
              <Text style={styles.subtitle}>
                {item?.name} · tamanho {item?.size}
              </Text>
            </View>

            <TouchableOpacity onPress={onCancel}>
              <Ionicons name="close" size={22} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancel_button} onPress={onCancel}>
              <Text style={styles.cancel_text}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirm_button} onPress={onConfirm}>
              <Text style={styles.confirm_text}>Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
