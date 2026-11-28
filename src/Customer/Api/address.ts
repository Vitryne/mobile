import type {
  AddressPayload,
  ClientAddress,
  ClientAddressResponseDTO,
} from "@/Customer/Types/address";
import { api } from "@/Shared/Api/apiConfig";

function mapAddress(dto: ClientAddressResponseDTO): ClientAddress {
  return {
    id: dto.id ?? 0,
    zipCode: dto.zipCode ?? "",
    street: dto.street ?? "",
    number: dto.number ?? "",
    neighborhood: dto.neighborhood ?? "",
    complement: dto.complement || null,
    city: dto.city ?? "",
    state: dto.state ?? "",
    selected: dto.selected ?? false,
    createdAt: dto.createdAt ?? "",
    updatedAt: dto.updatedAt ?? "",
  };
}

/**
 * GET /client/addresses
 */
async function getAddresses(): Promise<ClientAddress[]> {
  const response =
    await api.get<ClientAddressResponseDTO[]>("/client/addresses");
  return (response.data ?? []).map(mapAddress);
}

/**
 * GET /client/addresses/{addressId}
 */
async function getAddress(addressId: number): Promise<ClientAddress> {
  const response = await api.get<ClientAddressResponseDTO>(
    `/client/addresses/${addressId}`,
  );
  return mapAddress(response.data);
}

/**
 * POST /client/addresses
 */
async function createAddress(payload: AddressPayload): Promise<ClientAddress> {
  const response = await api.post<ClientAddressResponseDTO>(
    "/client/addresses",
    payload,
  );
  return mapAddress(response.data);
}

/**
 * PUT /client/addresses/{addressId}
 */
async function updateAddress(
  addressId: number,
  payload: AddressPayload,
): Promise<ClientAddress> {
  const response = await api.put<ClientAddressResponseDTO>(
    `/client/addresses/${addressId}`,
    payload,
  );
  return mapAddress(response.data);
}

/**
 * POST /client/addresses/{addressId}/select
 */
async function selectAddress(addressId: number): Promise<ClientAddress> {
  const response = await api.post<ClientAddressResponseDTO>(
    `/client/addresses/${addressId}/select`,
  );
  return mapAddress(response.data);
}

export {
  createAddress,
  getAddress,
  getAddresses,
  mapAddress,
  selectAddress,
  updateAddress,
};
