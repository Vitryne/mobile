import type {
  RegisterClientPayload,
  RegisterClientResponseDTO,
  RegisteredClient,
} from "@/Customer/Types/register";
import { api } from "@/Shared/Api/apiConfig";

function mapRegisteredClient(dto: RegisterClientResponseDTO): RegisteredClient {
  return {
    userId: dto.userId ?? 0,
    clientId: dto.clientId ?? 0,
    email: dto.email ?? "",
  };
}

//POST /auth/register/client
async function registerClient(
  payload: RegisterClientPayload,
): Promise<RegisteredClient> {
  const response = await api.post<RegisterClientResponseDTO>(
    "/auth/register/client",
    payload,
  );

  return mapRegisteredClient(response.data);
}

export { registerClient };

