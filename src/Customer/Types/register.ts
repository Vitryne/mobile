export type RegisterClientForm = {
  fullName: string;
  cpf: string;
  email: string;
  cep: string;
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
};

export type RegisterClientAddress = {
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
};

export type RegisterClientPayload = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  address: RegisterClientAddress;
};

export type RegisterClientResponseDTO = {
  userId?: number;
  clientId?: number;
  email?: string;
  role?: string;
  createdAt?: string;
};

export type RegisteredClient = {
  userId: number;
  clientId: number;
  email: string;
};

export type RegisterOutcome = "logged_in" | "registered" | "failed";
