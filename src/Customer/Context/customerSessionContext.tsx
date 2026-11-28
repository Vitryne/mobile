import { createContext, useContext, useState, type ReactNode } from "react";
import { clearToken } from "../../Shared/Api/tokenStorage";
import { restoreDefaultAddress } from "../Hooks/useOrderAddress";

export type CustomerUser = {
  fullName: string;
  email: string;
};

type CustomerSessionContextData = {
  currentUser: CustomerUser | null;
  registerCustomer: (user: CustomerUser) => void;
  loginCustomer: (email: string, fullName?: string) => void;
  logoutCustomer: () => Promise<void>;
};

const CustomerSessionContext = createContext<
  CustomerSessionContextData | undefined
>(undefined);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getDisplayName(email: string) {
  const username = email.split("@")[0];

  return (
    username
      .replace(/[._-]+/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ") || "Cliente"
  );
}

export function CustomerSessionProvider({ children }: { children: ReactNode }) {
  const [registeredUsers, setRegisteredUsers] = useState<CustomerUser[]>([]);

  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(null);

  function registerCustomer(user: CustomerUser) {
    const customer = {
      fullName: user.fullName.trim(),
      email: normalizeEmail(user.email),
    };

    setRegisteredUsers((previous) => {
      const exists = previous.some((item) => item.email === customer.email);

      if (exists) {
        return previous.map((item) =>
          item.email === customer.email ? customer : item,
        );
      }

      return [...previous, customer];
    });
  }

  function loginCustomer(email: string, fullName?: string) {
    const normalizedEmail = normalizeEmail(email);

    const registeredUser = registeredUsers.find(
      (user) => user.email === normalizedEmail,
    );

    setCurrentUser({
      fullName:
        fullName?.trim() ||
        registeredUser?.fullName ||
        getDisplayName(normalizedEmail),
      email: normalizedEmail,
    });
  }

  async function logoutCustomer() {
    await restoreDefaultAddress().catch(() => undefined);
    setCurrentUser(null);
    await clearToken();
  }

  return (
    <CustomerSessionContext.Provider
      value={{
        currentUser,
        registerCustomer,
        loginCustomer,
        logoutCustomer,
      }}
    >
      {children}
    </CustomerSessionContext.Provider>
  );
}

export function useCustomerSession() {
  const context = useContext(CustomerSessionContext);

  if (!context) {
    throw new Error(
      "useCustomerSession deve ser utilizado dentro de CustomerSessionProvider",
    );
  }

  return context;
}
