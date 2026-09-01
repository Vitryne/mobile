import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../Shared/Styles/commonStyles";
import { Register1 } from "../Screens/Register";
import { RootStackParamList } from "../Types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function DeliveryRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Register1"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Register1" component={Register1} />
    </Stack.Navigator>
  );
}