export type CustomerStackParamList = {
  Carregamento: undefined;
  Starter: undefined;
  Login: undefined;
  RegisterPersonalData: undefined;
  RegisterAuthenticator: { email: string };
  RegisterAddresData: undefined;
  MenuCarrinho: undefined;
  Endereco: undefined;
  Pagamento: undefined;
  PaguePix: { orderId: string };
  PedidoConfirmado: { orderId: string };
  Produto: undefined;
};
