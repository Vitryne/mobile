export type ClientAddressResponseDTO = {
  id?: number;
  zipCode?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  complement?: string | null;
  city?: string;
  state?: string;
  selected?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ClientAddress = {
  id: number;
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string | null;
  city: string;
  state: string;
  selected: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AddressPayload = {
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string;
  city: string;
  state: string;
};

export type AddressFormField = keyof AddressPayload;

export type AddressFormValues = Record<AddressFormField, string>;

export type AddressFormErrors = Partial<Record<AddressFormField, string>>;
