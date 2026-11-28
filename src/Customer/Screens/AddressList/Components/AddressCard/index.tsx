import type { ClientAddress } from "@/Customer/Types/address";
import { colors } from "@/Shared/Styles/commonStyles";
import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
  address: ClientAddress;
  mode: "manage" | "order";
  isDefault: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: (address: ClientAddress) => void;
  onEdit: (address: ClientAddress) => void;
};

function formatTitle(address: ClientAddress) {
  return [address.street, address.number].filter(Boolean).join(", ");
}

function formatDetails(address: ClientAddress) {
  return [address.neighborhood, address.city, address.complement]
    .filter(Boolean)
    .join(" · ");
}

export default function AddressCard({
  address,
  mode,
  isDefault,
  isLoading = false,
  disabled = false,
  onPress,
  onEdit,
}: Props) {
  const title = formatTitle(address);
  const details = formatDetails(address);
  const isOrderMode = mode === "order";
  const isInUse = isOrderMode && address.selected;

  function renderRight() {
    if (isLoading) {
      return <ActivityIndicator size="small" color={colors.primary} />;
    }

    if (isOrderMode) {
      return (
        <View style={[styles.checkbox, isInUse && styles.checkbox_checked]}>
          {isInUse ? (
            <Feather name="check" size={14} color={colors.white} />
          ) : null}
        </View>
      );
    }

    if (isDefault) {
      return (
        <View style={styles.badge}>
          <Text style={styles.badge_text}>PADRÃO</Text>
        </View>
      );
    }

    return <Feather name="chevron-right" size={18} color={colors.textMuted} />;
  }

  return (
    <Pressable
      style={[styles.container, isInUse && styles.container_in_use]}
      onPress={() => onPress(address)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={
        isOrderMode ? `Entregar em ${title}` : `Editar endereço ${title}`
      }
      accessibilityState={{ selected: isInUse, disabled }}
    >
      <View style={styles.icon_box}>
        <Feather name="map-pin" size={18} color={colors.primary} />
      </View>

      <View style={styles.info}>
        <View style={styles.title_row}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          {isOrderMode && isDefault ? (
            <View style={styles.badge}>
              <Text style={styles.badge_text}>PADRÃO</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.details} numberOfLines={2}>
          {details}
        </Text>

        {isOrderMode ? (
          <Pressable
            onPress={() => onEdit(address)}
            disabled={disabled}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={`Editar endereço ${title}`}
          >
            <Text style={styles.edit_text}>Editar</Text>
          </Pressable>
        ) : null}
      </View>

      {renderRight()}
    </Pressable>
  );
}
