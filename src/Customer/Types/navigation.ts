export type CustomerStackParamList = {
  Carregamento: undefined;
  Starter: undefined;
  Login: undefined;
  RegisterPersonalData: undefined;
  RegisterAuthenticator: {
    fullName: string;
    cpf: string;
    email: string;
  };
  RegisterAddresData: {
    fullName: string;
    cpf: string;
    email: string;
  };
  RegisterConfirmData: {
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
