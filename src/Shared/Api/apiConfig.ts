import axios, { AxiosError } from "axios";
import { clearToken, getToken } from "./tokenStorage";

/**
 * Instância central do axios.
 * Toda chamada da API deve importar 'api' daqui em vez de criar sua própria config.
 * Se a URL do backend mudar, só precisa trocar o baseURL abaixo
 */
export const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Bypass-Tunnel-Reminder": "true", // necessário para localtunnel não bloquear o request
  },
});

/**
 * Erro padronizado para toda a aplicação.
 * Assim os Hooks podem tratar erro de forma consistente:
 *
 *   catch (error) {
 *     if (error instanceof ApiError && error.status === 404) { ... }
 *   }
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public fields?: Record<string, string>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Tratador chamado quando a API recusa o token (401) fora das rotas /auth/.
// O navegador raiz registra aqui a volta para a tela de login.
let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

// Login e cadastros ficam em /auth/ e nunca levam token: um token vencido
// faria o back recusar até o próprio login.
function isAuthRoute(url?: string) {
  return (url ?? "").startsWith("/auth/");
}

// Anexa o token salvo em toda requisição que não seja /auth/.
api.interceptors.request.use(async (config) => {
  if (!isAuthRoute(config.url)) {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Intercepta qualquer erro de qualquer chamada feita com 'api'
// e converte para ApiError, já tratando timeout e erro de conexão.
api.interceptors.response.use(
  (response) => response,
  async (
    error: AxiosError<{ message?: string; fields?: Record<string, string> }>,
  ) => {
    if (error.response) {
      // O 401 do próprio login (senha errada) segue como erro normal.
      if (error.response.status === 401 && !isAuthRoute(error.config?.url)) {
        await clearToken();
        unauthorizedHandler?.();
      }

      // O backend respondeu, mas com status de erro (400, 404, 500...)
      throw new ApiError(
        error.response.status,
        error.response.data?.message || "Erro na requisição",
        error.response.data?.fields,
      );
    }

    if (error.code === "ECONNABORTED") {
      // Estourou o timeout configurado acima
      throw new ApiError(408, "Tempo de requisição excedido");
    }

    // Sem resposta do servidor (rede caiu, tunnel fora do ar, etc.)
    throw new ApiError(0, "Erro de conexão");
  },
);
