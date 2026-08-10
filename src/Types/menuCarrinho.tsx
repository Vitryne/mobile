export interface ItemCarrinhoDTO {
  id: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

export interface CarrinhoResponseDTO {
  id: number;
  usuarioId: number;
  itens: ItemCarrinhoDTO[];
  total: number;
}

export type ItemCarrinho = {
  id: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
};

export type Carrinho = {
  id: number;
  usuarioId: number;
  itens: ItemCarrinho[];
  total: number;
};
