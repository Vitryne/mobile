import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../Shared/Styles/commonStyles";
import { RootStackParamList } from "../Types/navigation";

import { HeaderBack } from "../Components/backButton";
import { Endereco } from "../Screens/Address";
import { MenuCarrinho } from "../Screens/Cart";
import { Carregamento } from "../Screens/Loading";
import { PedidoConfirmado } from "../Screens/Order";
import { Pagamento, PaguePix } from "../Screens/Payment";
import { Produto } from "../Screens/Product";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Rotas() {
  return (
    <Stack.Navigator
      initialRouteName="Carregamento"
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
        name="Carregamento"
        component={Carregamento}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MenuCarrinho"
        component={MenuCarrinho}
        options={{ title: "Meu carrinho" }}
      />
      <Stack.Screen
        name="Endereco"
        component={Endereco}
        options={{ title: "Endereço de entrega" }}
      />
      <Stack.Screen
        name="Pagamento"
        component={Pagamento}
        options={{ title: "Pagamento" }}
      />
      <Stack.Screen
        name="PaguePix"
        component={PaguePix}
        options={{ title: "Pague com PIX" }}
      />
      <Stack.Screen
        name="PedidoConfirmado"
        component={PedidoConfirmado}
        options={{ title: "Pedido confirmado" }}
      />
      <Stack.Screen
        name="Produto"
        component={Produto}
        options={{ title: "Produto" }}
      />
    </Stack.Navigator>
  );
}
