import axios, { AxiosError } from "axios";

/**
 * Instância central do axios.
 * Toda chamada da API deve importar 'api' daqui em vez de criar sua própria config.
 * Se a URL do backend mudar, só precisa trocar API_URL no .env
 */
export const api = axios.create({
  baseURL: process.env.API_URL ?? "",
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
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Intercepta qualquer erro de qualquer chamada feita com 'api'
// e converte para ApiError, já tratando timeout e erro de conexão.
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response) {
      // O backend respondeu, mas com status de erro (400, 404, 500...)
      throw new ApiError(
        error.response.status,
        error.response.data?.message || "Erro na requisição",
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
