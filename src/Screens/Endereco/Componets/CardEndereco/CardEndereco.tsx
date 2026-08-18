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
      style={[styles.card, selecionado && styles.card_selecionado]}
      onPress={onPress}
    >
      <View style={[styles.radio, selecionado && styles.radio_selecionado]}>
        {selecionado && <View style={styles.radio_dot} />}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.titulo}>{titulo}</Text>
          {tag && (
            <Text
              style={[
                styles.tag,
                tag.tipo === "padrao" ? styles.tag_padrao : styles.tag_alerta,
              ]}
            >
              {tag.texto}
            </Text>
          )}
        </View>
        <Text style={styles.texto}>{linha1}</Text>
        <Text style={styles.texto}>{linha2}</Text>
      </View>
    </Pressable>
  );
}
