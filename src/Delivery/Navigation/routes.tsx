import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderBack } from "../../Customer/Components/backButton";
import { colors } from "../../Shared/Styles/commonStyles";
import { Register1 } from "../Screens/Register/index";
import { RootStackParamList } from "../Types/navigation.ts";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RotasDelivery() {
  return (
    <Stack.Navigator
      initialRouteName="Registro1"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontSize: 20, fontWeight: "600" },
        headerTitleAlign: "left",
        headerShadowVisible: false,
        headerBackVisible: false,
        headerLeft: () => <HeaderBack />,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Registro1"
        component={Register1}
        options={{ title: "Register1" }}
      />
    </Stack.Navigator>
  );
}
