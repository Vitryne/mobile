import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DeliveryRoutes } from "./Delivery/Navigation/routes";

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DeliveryRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);

export default App;
