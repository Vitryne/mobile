import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

export type TabKey = "home" | "categories" | "orders" | "profile";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

const TABS: { key: TabKey; label: string; icon: FeatherIconName }[] = [
  { key: "home", label: "Início", icon: "home" },
  { key: "categories", label: "Categorias", icon: "grid" },
  { key: "orders", label: "Pedidos", icon: "clipboard" },
  { key: "profile", label: "Perfil", icon: "user" },
];

const MIN_BOTTOM_PADDING = 12;

type BottomNavBarProps = {
  activeTab: TabKey;
  onTabPress?: (tab: TabKey) => void;
};

export function BottomNavBar({ activeTab, onTabPress }: BottomNavBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, MIN_BOTTOM_PADDING) },
      ]}
      accessibilityRole="tablist"
    >
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress?.(tab.key)}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
          >
            <View
              style={[styles.iconBubble, isActive && styles.iconBubbleActive]}
            >
              <Feather
                name={tab.icon}
                size={20}
                color={isActive ? colors.primary : colors.textMuted}
              />
            </View>

            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
