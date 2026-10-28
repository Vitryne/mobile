import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

const WEB_MIN_TOP_INSET = 24;

type HeaderIconButtonProps = {
  icon: FeatherIconName;
  label: string;
  badge?: number;
  onPress?: () => void;
};

function HeaderIconButton({
  icon,
  label,
  badge,
  onPress,
}: HeaderIconButtonProps) {
  return (
    <Pressable
      style={styles.icon_button}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Feather name={icon} size={20} color={colors.text} />

      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badge_text}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

type HomeHeaderProps = {
  address: string;
  cartCount?: number;
  onPressAddress?: () => void;
  onPressNotifications?: () => void;
  onPressCart?: () => void;
};

export function HomeHeader({
  address,
  cartCount,
  onPressAddress,
  onPressNotifications,
  onPressCart,
}: HomeHeaderProps) {
  const insets = useSafeAreaInsets();
  const topInset =
    Platform.OS === "web"
      ? Math.max(insets.top, WEB_MIN_TOP_INSET)
      : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topInset + 4 }]}>
      <View style={styles.location_block}>
        <Feather name="map-pin" size={18} color={colors.primary} />

        <View>
          <Text style={styles.location_label}>ENTREGAR EM</Text>

          <Pressable
            style={styles.location_row}
            onPress={onPressAddress}
            accessibilityRole="button"
            accessibilityLabel="Alterar endereço de entrega"
          >
            <Text style={styles.location_text} numberOfLines={1}>
              {address}
            </Text>
            <Feather name="chevron-down" size={16} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <View style={styles.actions}>
        <HeaderIconButton
          icon="bell"
          label="Notificações"
          onPress={onPressNotifications}
        />
        <HeaderIconButton
          icon="shopping-bag"
          label="Sacola"
          badge={cartCount}
          onPress={onPressCart}
        />
      </View>
    </View>
  );
}
