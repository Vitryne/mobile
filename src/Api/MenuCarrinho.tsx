import {
  Carrinho,
  CarrinhoResponseDTO,
  ItemCarrinho
} from "../Types/menuCarrinho";
import { api } from "./apiConfig";

async function buscarCarrinho(usuarioId: number): Promise<Carrinho> {
  const response = await api.get<CarrinhoResponseDTO>(`/carrinho/${usuarioId}`);
  const carrinho = response.data;

  const itens: ItemCarrinho[] = (carrinho?.itens ?? []).map((item) => {
    const id = item?.id;
    const produtoId = item?.produtoId;
    const quantidade = item?.quantidade;
    const precoUnitario = item?.precoUnitario;

    return {
      id,
      produtoId,
      quantidade,
      precoUnitario,
      subtotal: precoUnitario * quantidade,
    };
  });

  return {
    id: carrinho?.id,
    usuarioId: carrinho?.usuarioId,
    itens,
    total: carrinho?.total,
  };
}

async function adicionarItem(
  usuarioId: number,
  produtoId: number,
  quantidade: number,
): Promise<Carrinho> {
  const response = await api.post<CarrinhoResponseDTO>(
    `/carrinho/${usuarioId}/itens`,
    { produtoId, quantidade },
  );
  const carrinho = response.data;

  const itens: ItemCarrinho[] = (carrinho?.itens ?? []).map((item) => {
    const id = item?.id;
    const itemProdutoId = item?.produtoId;
    const itemQuantidade = item?.quantidade;
    const precoUnitario = item?.precoUnitario;

    return {
      id,
      produtoId: itemProdutoId,
      quantidade: itemQuantidade,
      precoUnitario,
      subtotal: precoUnitario * itemQuantidade,
    };
  });

  return {
    id: carrinho?.id,
    usuarioId: carrinho?.usuarioId,
    itens,
    total: carrinho?.total,
  };
}

async function atualizarQuantidadeItem(
  usuarioId: number,
  itemId: number,
  quantidade: number,
): Promise<Carrinho> {
  const response = await api.put<CarrinhoResponseDTO>(
    `/carrinho/${usuarioId}/itens/${itemId}`,
    { quantidade },
  );
  const carrinho = response.data;

  const itens: ItemCarrinho[] = (carrinho?.itens ?? []).map((item) => {
    const id = item?.id;
    const produtoId = item?.produtoId;
    const itemQuantidade = item?.quantidade;
    const precoUnitario = item?.precoUnitario;

    return {
      id,
      produtoId,
      quantidade: itemQuantidade,
      precoUnitario,
      subtotal: precoUnitario * itemQuantidade,
    };
  });

  return {
    id: carrinho?.id,
    usuarioId: carrinho?.usuarioId,
    itens,
    total: carrinho?.total,
  };
}

async function removerItem(
  usuarioId: number,
  itemId: number,
): Promise<Carrinho> {
  const response = await api.delete<CarrinhoResponseDTO>(
    `/carrinho/${usuarioId}/itens/${itemId}`,
  );
  const carrinho = response.data;

  const itens: ItemCarrinho[] = (carrinho?.itens ?? []).map((item) => {
    const id = item?.id;
    const produtoId = item?.produtoId;
    const quantidade = item?.quantidade;
    const precoUnitario = item?.precoUnitario;

    return {
      id,
      produtoId,
      quantidade,
      precoUnitario,
      subtotal: precoUnitario * quantidade,
    };
  });

  return {
    id: carrinho?.id,
    usuarioId: carrinho?.usuarioId,
    itens,
    total: carrinho?.total,
  };
}

async function limparCarrinho(usuarioId: number): Promise<Carrinho> {
  const response = await api.delete<CarrinhoResponseDTO>(
    `/carrinho/${usuarioId}/itens`,
  );
  const carrinho = response.data;

  return {
    id: carrinho?.id,
    usuarioId: carrinho?.usuarioId,
    itens: [],
    total: carrinho?.total,
  };
}

export {
  adicionarItem,
  atualizarQuantidadeItem,
  buscarCarrinho,
  limparCarrinho,
  removerItem
};

