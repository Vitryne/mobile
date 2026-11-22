import type { NavigatorScreenParams } from "@react-navigation/native";
import type { CartItem } from "./cart";

export type AddressData = {
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
};

export type CustomerTabParamList = {
  Home: undefined;
  Category: {
    categoryId: string;
    categoryName: string;
  };
  Orders: undefined;
  Profile: undefined;
};

export type CustomerStackParamList = {
  Loading: undefined;
  Starter: undefined;
  Login: undefined;
  MainTabs: NavigatorScreenParams<CustomerTabParamList>;
  Product: { productId: number };
  PaymentCard: undefined;
  Cart: undefined;
  Payment: {
    items: CartItem[];
    total: number;
  };

  PaymentPIX: {
    amount: number;
    items: CartItem[];
  };

  OrderConfirmed: {
    protocol: string;
    total: number;
  };

  OrderDetails: {
    orderId: string;
  };

  RegisterPersonalData:
    | {
        editMode?: boolean;
        fullName?: string;
        cpf?: string;
        email?: string;
        Address?: AddressData;
      }
    | undefined;

  RegisterAuthenticator: {
    fullName: string;
    cpf: string;
    email: string;
  };

  RegisterAddressData: {
    editMode?: boolean;
    fullName: string;
    cpf: string;
    email: string;
    initialAddress?: AddressData;
  };

  RegisterConfirmData: {
    fullName: string;
    cpf: string;
    email: string;
  } & AddressData;
};
