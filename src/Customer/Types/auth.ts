export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponseDTO = {
  accessToken?: string;
  tokenType?: string;
  expiresIn?: number;
};

export type AuthSession = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};
