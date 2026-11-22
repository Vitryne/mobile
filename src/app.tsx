import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { setUnauthorizedHandler } from "./Shared/Api/apiConfig";
import { AppRoutes } from "./Shared/Navigation/routes";
import type { AppStackParamList } from "./Shared/Types/navigation";

const navigationRef = createNavigationContainerRef<AppStackParamList>();

// if (Platform.OS === "web") {
//   const rootEl = document.getElementById("root");
//   document.documentElement.style.height = "100%";
//   document.body.style.height = "100%";
//   if (rootEl) rootEl.style.height = "100%";
// }

function App() {
  // Token vencido ou recusado (401): volta para o login
  useEffect(() => {
    setUnauthorizedHandler(() => {
      if (!navigationRef.isReady()) return;

      navigationRef.reset({
        index: 0,
        routes: [{ name: "CustomerStack", params: { screen: "Login" } }],
      });
    });

    return () => setUnauthorizedHandler(null);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AppRoutes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);

export default App;
