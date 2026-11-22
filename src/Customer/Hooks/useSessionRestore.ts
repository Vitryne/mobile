import { useCustomerSession } from "@/Customer/Context/customerSessionContext";
import type { CustomerStackParamList } from "@/Customer/Types/navigation";
import { getValidSession } from "@/Shared/Api/tokenStorage";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";

// Tempo mínimo da splash
const SPLASH_MS = 3000;

type LoadingNavigation = NativeStackNavigationProp<
  CustomerStackParamList,
  "Loading"
>;

// Se há um token de cliente ainda válido, pula o login e vai direto para a Home
export function useSessionRestore(navigation: LoadingNavigation) {
  const { loginCustomer } = useCustomerSession();

  useEffect(() => {
    let active = true;

    const wait = new Promise((resolve) => setTimeout(resolve, SPLASH_MS));

    const session = getValidSession().catch(() => null);

    Promise.all([session, wait]).then(([storedSession]) => {
      if (!active) return;

      if (storedSession && storedSession.role === "CONSUMER") {
        loginCustomer(storedSession.email);
        navigation.replace("MainTabs", { screen: "Home" });
        return;
      }

      navigation.replace("Starter");
    });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
}
