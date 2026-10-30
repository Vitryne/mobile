import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../Shared/Styles/commonStyles";
import { CustomerStackParamList } from "../Types/navigation";

import { HeaderBack } from "../Components/backButton";
import { Cart } from "../Screens/Cart";
import { Category } from "../Screens/Category/Screens/Category";
import { Home } from "../Screens/Home/Screens/Home";
import { Loading } from "../Screens/Loading/index";
import { Login } from "../Screens/Login";
import { Payment } from "../Screens/Payment";
import { Product } from "../Screens/Product/index";
import { RegisterAddressData } from "../Screens/Register/Screens/RegisterAddressData";
import { RegisterAuthenticator } from "../Screens/Register/Screens/RegisterAuthenticator";
import { RegisterConfirmData } from "../Screens/Register/Screens/RegisterConfirmData";
import { RegisterPersonalData } from "../Screens/Register/Screens/RegisterPersonalData";
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
        name="RegisterAddressData"
        component={RegisterAddressData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterConfirmData"
        component={RegisterConfirmData}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
