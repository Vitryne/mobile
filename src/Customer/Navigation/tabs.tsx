import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabBarIcon, TabBarLabel } from "@/Customer/Components/TabBarIcon";
import {
  getTabBarHeight,
  styles,
  TAB_BAR_MIN_BOTTOM_PADDING,
} from "@/Customer/Components/TabBarIcon/styles";
import { Category } from "@/Customer/Screens/Category/Screens/Category";
import { Home } from "@/Customer/Screens/Home/Screens/Home";
import { Orders } from "@/Customer/Screens/Orders/Screens";
import { Profile } from "@/Customer/Screens/Profile/Screens";
import type { CustomerTabParamList } from "@/Customer/Types/navigation";
import { colors } from "@/Shared/Styles/commonStyles";

const Tab = createBottomTabNavigator<CustomerTabParamList>();

export function MainTabs() {
  const insets = useSafeAreaInsets();
  const { fontScale } = useWindowDimensions();
  const bottomPadding = Math.max(insets.bottom, TAB_BAR_MIN_BOTTOM_PADDING);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelVisibilityMode: "labeled",
        tabBarLabelPosition: "below-icon",
        tabBarStyle: [
          styles.tab_bar,
          {
            height: getTabBarHeight(fontScale, bottomPadding),
            paddingBottom: bottomPadding,
          },
        ],
        tabBarItemStyle: styles.tab_item,
        tabBarIconStyle: styles.tab_icon,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel label="Início" focused={focused} color={color} />
          ),
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="home" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        initialParams={{ categoryId: "all", categoryName: "Todas" }}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel label="Categorias" focused={focused} color={color} />
          ),
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="grid" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel label="Pedidos" focused={focused} color={color} />
          ),
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="clipboard" focused={focused} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel label="Perfil" focused={focused} color={color} />
          ),
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon name="user" focused={focused} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
