import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../Shared/Styles/commonStyles";
import { HeaderBack } from "../Components/backButton";
import { Loading } from "../Screens/Loading";
import { Login } from "../Screens/Login";
import { RegisterAddresData } from "../Screens/Register/Screens/RegisterAdressData";
import { RegisterAuthenticator } from "../Screens/Register/Screens/RegisterAuthenticator";
import { RegisterPersonalData } from "../Screens/Register/Screens/RegisterPersonalData";
import { Starter } from "../Screens/Starter";
import { CustomerStackParamList } from "../Types/navigation";

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
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterPersonalData"
        component={RegisterPersonalData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterAuthenticator"
        component={RegisterAuthenticator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterAddresData"
        component={RegisterAddresData}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}