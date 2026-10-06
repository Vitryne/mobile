export type CustomerStackParamList = {
  Carregamento: undefined;
  Starter: undefined;
  Login: undefined;
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
  MenuCarrinho: undefined;
  Endereco: undefined;
  Pagamento: undefined;
  PaguePix: { orderId: string };
  PedidoConfirmado: { orderId: string };
  Produto: undefined;
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
