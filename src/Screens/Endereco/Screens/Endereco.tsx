import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Stepper } from "../../../Components/Stepper/Stepper";
import { colors, commonStyles } from "../../../Styles/commonStyles";
import { RootStackParamList } from "../../../Types/navigation";
import { CardEndereco } from "../Componets/CardEndereco/CardEndereco";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Endereco">;

const enderecos = [
  {
    id: "1",
    titulo: "Casa",
    tag: { texto: "PADRÃO", tipo: "padrao" as const },
    linha1: "Av. Brasil, 123 — apto 502",
    linha2: "Jardins, São Paulo - SP, 04567-000",
  },
  {
    id: "2",
    titulo: "Trabalho",
    tag: { texto: "FORA DO RAIO", tipo: "alerta" as const },
    linha1: "R. Oscar Freire, 940 — sala 12",
    linha2: "Jardins, São Paulo - SP, 01426-001",
  },
];

const tempos = [
  { loja: "Atelier Lua", tempo: "40–60 min" },
  { loja: "Casa Verão", tempo: "50–70 min" },
];

const steps = ["Endereço", "Pagamento", "Confirmação"];

export function Endereco({ navigation }: Props) {
  const [selecionado, setSelecionado] = useState("1");

  return (
    <View style={commonStyles.screen}>
      <Stepper passos={steps} stepAtual={0} />

      <ScrollView contentContainerStyle={commonStyles.scroll_content}>
        <Text style={commonStyles.section_label}>SELECIONE UM ENDEREÇO</Text>

        {enderecos.map((e) => (
          <CardEndereco
            key={e.id}
            titulo={e.titulo}
            tag={e.tag}
            linha1={e.linha1}
            linha2={e.linha2}
            selecionado={selecionado === e.id}
            onPress={() => setSelecionado(e.id)}
          />
        ))}

        {/* Box de aviso (no real seria condicional ao carrinho/seleção) */}
        <View style={styles.alert_box}>
          <Ionicons
            name="alert-circle-outline"
            size={18}
            color={colors.danger}
            style={{ marginTop: 1 }}
          />
          <Text style={styles.alert_text}>
            <Text style={styles.alert_highlight}>Casa Verão</Text> não entrega
            no endereço "Trabalho". Selecione outro endereço ou remova os itens
            dessa loja.
          </Text>
        </View>

        <Pressable style={styles.add_btn}>
          <Text style={styles.add_btn_text}>+ Adicionar novo endereço</Text>
        </Pressable>

        {/* Tempo estimado de entrega */}
        <View style={commonStyles.card}>
          <Text style={styles.tempo_title}>Tempo estimado de entrega</Text>
          {tempos.map((t) => (
            <View key={t.loja} style={styles.tempo_row}>
              <Text style={styles.tempo_store}>{t.loja}</Text>
              <Text style={styles.tempo_price}>{t.tempo}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={commonStyles.button}
          onPress={() => navigation.navigate("Pagamento")}
        >
          <Text style={commonStyles.button_text}>Continuar para pagamento</Text>
        </Pressable>
      </View>
    </View>
  );
}
