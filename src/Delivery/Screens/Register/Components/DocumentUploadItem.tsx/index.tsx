import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

/* ============================================================
   TIPOS
   status controla TODA a aparência do card:
   - sent    -> ícone verde de confirmado, sem botão
   - pending -> botão "Enviar"
   - invalid -> texto de erro em vermelho + botão "Reenviar"
   ============================================================ */
export type DocumentStatus = "sent" | "pending" | "invalid";

type DocumentUploadItemProps = {
  label: string;
  status: DocumentStatus;
  icon: keyof typeof Feather.glyphMap;
  onPress: () => void;
};

/* ============================================================
   CONFIGURAÇÃO VISUAL POR STATUS
   Centraliza cor, texto e label do botão em um lugar só.
   Todas as cores vêm do commonStyles, sem hex solto aqui.
   ============================================================ */
const statusConfig = {
  sent: {
    text: "Enviado",
    textColor: colors.success,
    iconBackground: colors.successSoft,
    iconColor: colors.success,
    buttonLabel: null,
  },
  pending: {
    text: "Pendente",
    textColor: colors.textMuted,
    iconBackground: colors.border,
    iconColor: colors.textMuted,
    buttonLabel: "Enviar",
  },
  invalid: {
    text: "Documento ilegível.",
    textColor: colors.danger,
    iconBackground: colors.dangerSoft,
    iconColor: colors.danger,
    buttonLabel: "Reenviar",
  },
};

export function DocumentUploadItem({
  label,
  status,
  icon,
  onPress,
}: DocumentUploadItemProps) {
  const config = statusConfig[status];

  return (
    <View
      style={[
        styles.card,
        status === "invalid" && styles.card_invalid,
      ]}
    >
      <View style={[styles.icon_box, { backgroundColor: config.iconBackground }]}>
        <Feather name={icon} size={18} color={config.iconColor} />
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.status_text, { color: config.textColor }]}>
          {config.text}
        </Text>
      </View>

      {status === "sent" ? (
        <Feather name="check" size={20} color={colors.success} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Feather name="upload" size={14} color={colors.white} />
          <Text style={styles.button_text}>{config.buttonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}