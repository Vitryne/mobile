export type CustomerStackParamList = {
  Loading: undefined;
  Starter: undefined;
  Login: undefined;
  Product:undefined;
  RegisterConfirmData: undefined;
  RegisterPersonalData:
    | {
        editMode?: boolean;
        fullName?: string;
        cpf?: string;
        email?: string;
        address?: AddressData;
      }
    | undefined;

  RegisterAuthenticator: {
    fullName: string;
    cpf: string;
    email: string;
  };

  RegisterAddresData:
    | {
        editMode?: boolean;
        fullName: string;
        cpf: string;
        email: string;
        address?: AddressData;
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

