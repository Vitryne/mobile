import type { CartStore } from "../Hooks/useCart";
export type CustomerStackParamList = {
  Loading: undefined;
  Starter: undefined;
  Login: undefined;
  Home: undefined;
  Category: {
    categoryId: string;
    categoryName: string;
  };

  Product: undefined;
  Cart: undefined;
  Payment: {
    stores: CartStore[];
  };
  PaymentPIX: {
    amount: number;
  };
  RegisterConfirmData: undefined;
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

  RegisterAddressData:
    | {
        editMode?: boolean;
        fullName: string;
        cpf: string;
        email: string;
        Address?: AddressData;
      }
    | undefined;

  ConfirmaDados: {
    fullName: string;
    cpf: string;
    email: string;

    cep: string;
    city: string;
    state: string;
    street: string;
    number: string;
    neighborhood: string;
    complement: string;
  };
};

export type AddressData = {
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
};
