import type { CartStore } from "../Hooks/useCart";

export type AddressData = {
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
};

export type CustomerStackParamList = {
  Loading: undefined;
  Starter: undefined;
  Login: undefined;
  Home: undefined;
  Category: {
    categoryId: string;
    categoryName: string;
  };

  Profile: undefined;
  Product: { productId: number };
  PaymentCard: undefined;
  Cart: undefined;
  Payment: {
    stores: CartStore[];
  };
  Orders: undefined;

  PaymentPIX: {
    amount: number;
    stores: CartStore[];
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
