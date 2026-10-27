import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ComponentProps } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../../../Shared/Styles/commonStyles";
import { CustomerStackParamList } from "../../Types/navigation";
import { styles } from "./styles";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

type TabRoute = "Home" | "Category";

type TabKey = "home" | "categories" | "orders" | "profile";

type Tab = {
  key: TabKey;
  label: string;
  icon: FeatherIconName;
  route?: TabRoute;
};

const TABS: Tab[] = [
  {
    key: "home",
    route: "Home",
    label: "Início",
    icon: "home",
  },
  {
    key: "categories",
    route: "Category",
    label: "Categorias",
    icon: "grid",
  },
  {
    key: "orders",
    label: "Pedidos",
    icon: "clipboard",
  },
  {
    key: "profile",
    label: "Perfil",
    icon: "user",
  },
];

const MIN_BOTTOM_PADDING = 12;

export function BottomNavBar() {
  const insets = useSafeAreaInsets();
  const route = useRoute();

  const navigation =
    useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();

  function handlePress(target?: TabRoute) {
    if (!target || target === route.name) return;

    navigation.replace(target);
  }

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, MIN_BOTTOM_PADDING),
        },
      ]}
      accessibilityRole="tablist"
    >
      {TABS.map((tab) => {
        const isActive = tab.route !== undefined && tab.route === route.name;

        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => handlePress(tab.route)}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{
              selected: isActive,
            }}
          >
            <View
              style={[
                styles.icon_bubble,
                isActive && styles.icon_bubble_active,
              ]}
            >
              <Feather
                name={tab.icon}
                size={20}
                color={isActive ? colors.primary : colors.textMuted}
              />
            </View>

            <Text style={[styles.label, isActive && styles.label_active]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
