import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../Styles/estilosComuns";
import { RootStackParamList } from "../Types/navegacao";

import { HeaderBack } from "../Components/botaoVoltar";
import { Endereco } from "../Screens/Endereco";
import { MenuCarrinho } from "../Screens/Carrinho";
import { PedidoConfirmado } from "../Screens/Pedido";
import { Pagamento, PaguePix } from "../Screens/Pagamento";
import { Produto } from "../Screens/Produto";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Rotas() {
  return (
    <Stack.Navigator
      initialRouteName="Produto"
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
