import { Feather } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Text, View } from "react-native";

import { styles, TAB_BAR_ICON_SIZE, TAB_BAR_MAX_FONT_SCALE } from "./styles";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

type TabBarIconProps = {
  name: FeatherIconName;
  focused: boolean;
  color: string;
};

type TabBarLabelProps = {
  label: string;
  focused: boolean;
  color: string;
};

export function TabBarIcon({ name, focused, color }: TabBarIconProps) {
  return (
    <View style={[styles.pill, focused && styles.pill_active]}>
      <Feather name={name} size={TAB_BAR_ICON_SIZE} color={color} />
    </View>
  );
}

export function TabBarLabel({ label, focused, color }: TabBarLabelProps) {
  return (
    <Text
      style={[styles.label, focused && styles.label_active, { color }]}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.85}
      maxFontSizeMultiplier={TAB_BAR_MAX_FONT_SCALE}
    >
      {label}
    </Text>
  );
}
