import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppRoutes } from "./Shared/Navigation/routes";

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);

export default App;
