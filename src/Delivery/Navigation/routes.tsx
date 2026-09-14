import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../Shared/Styles/commonStyles";
import { Login } from "../Screens/Login";
import {
  RegisterBankAccount,
  RegisterDocuments,
  RegisterPersonalData,
  RegisterVehicle,
} from "../Screens/Register";
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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="RegisterPersonalData"
        component={RegisterPersonalData}
      />
      <Stack.Screen name="RegisterDocuments" component={RegisterDocuments} />
      <Stack.Screen name="RegisterVehicle" component={RegisterVehicle} />
      <Stack.Screen
        name="RegisterBankAccount"
        component={RegisterBankAccount}
      />
    </Stack.Navigator>
  );
}
