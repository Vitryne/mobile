import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Rotas } from "../../Customer/Navigation/routes";
import { DeliveryRoutes } from "../../Delivery/Navigation/routes";
import type { AppStackParamList } from "../Types/navigation";

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="CustomerStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DeliveryStack" component={DeliveryRoutes} />
      <Stack.Screen name="CustomerStack" component={Rotas} />
    </Stack.Navigator>
  );
}
