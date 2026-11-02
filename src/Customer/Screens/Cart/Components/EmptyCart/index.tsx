import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

type Props = {
  onExplore: () => void;
};

export default function EmptyCart({ onExplore }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.icon_circle}>
        <Ionicons
          name="bag-handle-outline"
          size={28}
          color={colors.textMuted}
        />
      </View>

      <Text style={styles.title}>Sua sacola está vazia</Text>
      <Text style={styles.description}>
        Explore as lojas perto de você e encontre peças que combinem com o seu
        estilo.
      </Text>

      <TouchableOpacity style={styles.button} onPress={onExplore}>
        <Text style={styles.button_text}>Explorar lojas</Text>
      </TouchableOpacity>
    </View>
  );
}
