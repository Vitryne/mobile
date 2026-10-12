import { useState } from "react";

// --------------------------------------------------
//   Tipos do formulário de endereço.
//   Aqui não existe "tipo de endereço" (diferente do
//   VehicleType), então tudo fica neste único arquivo.
// --------------------------------------------------
export type AddressFieldName =
  | "cep"
  | "city"
  | "state"
  | "street"
  | "number"
  | "neighborhood"
  | "complement";

export type AddressFieldWidth = "full" | "half" | "wide" | "narrow";

export interface AddressFieldConfig {
  name: AddressFieldName;
  label: string;
  placeholder: string;
  required: boolean;
  width: AddressFieldWidth;
  kind: "text";
  keyboardType?: "default" | "numeric";
  autoCapitalize?: "none" | "characters" | "words";
  maxLength?: number;
}

export type AddressFormValues = Record<AddressFieldName, string>;

// --------------------------------------------------
//   Mapa central de configuração.
//   a tela só lê os campos daqui e desenha.
// --------------------------------------------------
export const ADDRESS_FIELDS: AddressFieldConfig[] = [
  {
    name: "cep",
    label: "CEP",
    placeholder: "00000-000",
    required: true,
    width: "full",
    kind: "text",
    keyboardType: "numeric",
    maxLength: 9, // 8 dígitos + hífen
  },
  {
    name: "city",
    label: "Cidade",
    placeholder: "São Paulo",
    required: true,
    width: "half",
    kind: "text",
  },
  {
    name: "state",
    label: "UF",
    placeholder: "UF",
    required: true,
    width: "narrow",
    kind: "text",
    autoCapitalize: "characters",
    maxLength: 2,
  },
  {
    name: "street",
    label: "Endereço",
    placeholder: "Av. Brasil",
    required: true,
    width: "full",
    kind: "text",
  },
  {
    name: "number",
    label: "Número",
    placeholder: "123",
    required: true,
    width: "half",
    kind: "text",
    keyboardType: "numeric",
  },
  {
    name: "neighborhood",
    label: "Bairro",
    placeholder: "Centro, Zona...",
    required: true,
    width: "half",
    kind: "text",
  },
  {
    name: "complement",
    label: "Complemento",
    placeholder: "Casa, Apto, Bloco...",
    required: false,
    width: "full",
    kind: "text",
  },
];

// --------------------------------------------------
//   Valores iniciais.
// --------------------------------------------------
const INITIAL_VALUES: AddressFormValues = {
  cep: "",
  city: "",
  state: "",
  street: "",
  number: "",
  neighborhood: "",
  complement: "",
};

// --------------------------------------------------
//   CEP no padrão 00000-000: joga fora qualquer
//   caractere que não seja número, corta em 8 dígitos
//   e insere o hífen na posição certa.
// --------------------------------------------------
function formatCep(value: string) {
  const digitsOnly = value.replace(/[^0-9]/g, "").slice(0, 8);

  if (digitsOnly.length <= 5) {
    return digitsOnly;
  }

  return `${digitsOnly.slice(0, 5)}-${digitsOnly.slice(5)}`;
}

// --------------------------------------------------
//   UF só aceita letras, maiúsculas, até 2 caracteres.
// --------------------------------------------------
function formatState(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 2);
}

// --------------------------------------------------
//   Busca o endereço a partir do CEP (ViaCEP).
//   Só é chamada quando o CEP tem os 8 dígitos.
//   Se quiser tirar essa integração, é só remover
//   essa função e a chamada dela em handleChangeField.
// --------------------------------------------------
async function fetchAddressByCep(cep: string) {
  const digitsOnly = cep.replace(/[^0-9]/g, "");

  if (digitsOnly.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${digitsOnly}/json/`,
    );
    const data = await response.json();

    if (data.erro) {
      return null;
    }

    return {
      city: data.localidade ?? "",
      state: data.uf ?? "",
      street: data.logradouro ?? "",
      neighborhood: data.bairro ?? "",
    };
  } catch {
    return null;
  }
}

export function useAddressForm() {
  const [values, setValues] = useState<AddressFormValues>(INITIAL_VALUES);
  const [isFetchingCep, setIsFetchingCep] = useState(false);
  const [isCepInvalid, setIsCepInvalid] = useState(false);

  const visibleFields = ADDRESS_FIELDS;

  function handleChangeField(field: AddressFieldName, value: string) {
    let formattedValue = value;

    if (field === "cep") {
      formattedValue = formatCep(value);
      // CEP mudou, então qualquer erro de busca anterior não vale mais.
      setIsCepInvalid(false);
    }

    if (field === "state") {
      formattedValue = formatState(value);
    }

    setValues((previous) => ({ ...previous, [field]: formattedValue }));

    if (field === "cep") {
      handleCepLookup(formattedValue);
    }
  }

  async function handleCepLookup(cep: string) {
    const digitsOnly = cep.replace(/[^0-9]/g, "");

    if (digitsOnly.length !== 8) {
      return;
    }

    setIsFetchingCep(true);
    const address = await fetchAddressByCep(cep);
    setIsFetchingCep(false);

    if (!address) {
      setIsCepInvalid(true);
      return;
    }

    setIsCepInvalid(false);

    // CEP validado: preenche (e sobrescreve) cidade, UF, endereço e bairro.
    setValues((previous) => ({
      ...previous,
      city: address.city,
      state: address.state,
      street: address.street,
      neighborhood: address.neighborhood,
    }));
  }

  const isCepValid =
    values.cep.replace(/[^0-9]/g, "").length === 8 && !isCepInvalid;
  const isCityValid = values.city.trim() !== "";
  const isStateValid = values.state.length === 2;
  const isStreetValid = values.street.trim() !== "";
  const isNumberValid = values.number.trim() !== "";
  const isNeighborhoodValid = values.neighborhood.trim() !== "";

  const isFormValid = visibleFields
    .filter((field) => field.required)
    .every((field) => values[field.name].trim() !== "");

  return {
    values,
    visibleFields,
    isFormValid,
    isFetchingCep,
    isCepInvalid,
    isCepValid,
    isCityValid,
    isStateValid,
    isStreetValid,
    isNumberValid,
    isNeighborhoodValid,
    handleChangeField,
  };
}
