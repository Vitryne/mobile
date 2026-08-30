import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../Shared/Styles/commonStyles";
import { Register1 } from "../Screens/Register";
import { RegisterHeader } from "../Screens/Register/Components/RegisterHeader";
import { RootStackParamList } from "../Types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function DeliveryRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Register1"
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Register1"
        component={Register1}
        options={{ header: () => <RegisterHeader currentStep={1} /> }}
      />
    </Stack.Navigator>
  );
}
