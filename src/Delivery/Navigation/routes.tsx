import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../Shared/Styles/commonStyles";
import { Login } from "../Screens/Login";
import { Register1, Register2 } from "../Screens/Register";
import { DeliveryStackParamList } from "../Types/navigation";

const Stack = createNativeStackNavigator<DeliveryStackParamList>();

export function DeliveryRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Register1" component={Register1} />
      <Stack.Screen name="Register2" component={Register2} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
