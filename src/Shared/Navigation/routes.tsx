import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomerRoutes } from "../../Customer/Navigation/routes";
import { DeliveryRoutes } from "../../Delivery/Navigation/routes";
import type { AppStackParamList } from "../Types/navigation";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="DeliveryStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DeliveryStack" component={DeliveryRoutes} />
      <Stack.Screen name="CustomerStack" component={CustomerRoutes} />
    </Stack.Navigator>
  );
}
