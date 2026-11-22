import type { NavigatorScreenParams } from "@react-navigation/native";

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
  Payment: undefined;

  PaymentPIX: {
    amount: number;
    reviewToken: string;
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
