import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppRoutes } from "./Shared/Navigation/routes";

// if (Platform.OS === "web") {
//   const rootEl = document.getElementById("root");
//   document.documentElement.style.height = "100%";
//   document.body.style.height = "100%";
//   if (rootEl) rootEl.style.height = "100%";
// }

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
