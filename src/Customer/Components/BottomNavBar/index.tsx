import {
    House,
    LayoutGrid,
    ReceiptText,
    UserRound,
    type LucideIcon,
} from "lucide-react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../../../Shared/Styles/commonStyles";
import { CustomerStackParamList } from "../../Types/navigation";
import { styles } from "./styles";

type TabRoute = "Home" | "Category";

type Tab = {
  label: string;
  icon: LucideIcon;
  route?: TabRoute;
};

const TABS: Tab[] = [
  {
    route: "Home",
    label: "Início",
    icon: House,
  },
  {
    route: "Category",
    label: "Categorias",
    icon: LayoutGrid,
  },
  {
    label: "Pedidos",
    icon: ReceiptText,
  },
  {
    label: "Perfil",
    icon: UserRound,
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

        const Icon = tab.icon;

        return (
          <Pressable
            key={tab.label}
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
              <Icon
                size={20}
                strokeWidth={1.7}
                color={
                  isActive
                    ? colors.primary
                    : tab.route === "Home"
                      ? "#6C6779"
                      : "#15131C"
                }
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
