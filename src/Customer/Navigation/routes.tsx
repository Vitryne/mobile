import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../Shared/Styles/commonStyles";
import { CustomerStackParamList } from "../Types/navigation";

import { HeaderBack } from "../Components/backButton";
import { Loading } from "../Screens/Loading";
import { Starter } from "../Screens/Starter";

const Stack = createNativeStackNavigator<CustomerStackParamList>();

export function CustomerRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
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
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Starter"
        component={Starter}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}