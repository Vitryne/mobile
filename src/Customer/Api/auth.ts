import type {
  AuthSession,
  LoginCredentials,
  LoginResponseDTO,
} from "@/Customer/Types/auth";
import { api } from "../../Shared/Api/apiConfig";

function mapLogin(dto: LoginResponseDTO): AuthSession {
  return {
    accessToken: dto.accessToken ?? "",
    tokenType: dto.tokenType ?? "Bearer",
    expiresIn: dto.expiresIn ?? 0,
  };
}

// POST /auth/login
async function login(credentials: LoginCredentials): Promise<AuthSession> {
  const response = await api.post<LoginResponseDTO>("/auth/login", {
    email: credentials.email,
    password: credentials.password,
  });

  return mapLogin(response.data);
}

export { login };

