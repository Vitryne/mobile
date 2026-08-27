import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type Tag = { texto: string; tipo: "padrao" | "alerta" };

type CardEnderecoProps = {
  titulo: string;
  tag?: Tag;
  linha1: string;
  linha2: string;
  selecionado: boolean;
  onPress: () => void;
};

export function CardEndereco({
  titulo,
  tag,
  linha1,
  linha2,
  selecionado,
  onPress,
}: CardEnderecoProps) {
  return (
    <Pressable
      style={[styles.card, selecionado && styles.card_selected]}
      onPress={onPress}
    >
      <View style={[styles.radio, selecionado && styles.radio_selected]}>
        {selecionado && <View style={styles.radio_dot} />}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>{titulo}</Text>
          {tag && (
            <Text
              style={[
                styles.tag,
                tag.tipo === "padrao" ? styles.tag_default : styles.tag_alert,
              ]}
            >
              {tag.texto}
            </Text>
          )}
        </View>
        <Text style={styles.text}>{linha1}</Text>
        <Text style={styles.text}>{linha2}</Text>
      </View>
    </Pressable>
  );
}
