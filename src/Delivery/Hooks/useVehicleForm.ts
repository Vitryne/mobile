import { useState } from "react";
import type {
  VehicleFieldName,
  VehicleFormValues,
  VehicleType,
  VehicleTypeConfig,
} from "../Types/vehicle";

// --------------------------------------------------
//   Campos compartilhados por moto e carro.
// --------------------------------------------------
function buildMotorizedFields(
  brandExample: string,
  modelExample: string,
  colorExample: string,
): VehicleTypeConfig["fields"] {
  return [
    {
      name: "brand",
      label: "Marca",
      placeholder: brandExample,
      required: true,
      width: "half",
      kind: "text",
    },
    {
      name: "model",
      label: "Modelo",
      placeholder: modelExample,
      required: true,
      width: "half",
      kind: "text",
    },
    {
      name: "plate",
      label: "Placa",
      placeholder: "ABC1D23",
      required: true,
      width: "wide",
      kind: "text",
      autoCapitalize: "characters",
      maxLength: 7,
    },
    {
      name: "year",
      label: "Ano",
      placeholder: "2026",
      required: true,
      width: "narrow",
      kind: "text",
      keyboardType: "numeric",
      maxLength: 4,
    },
    {
      name: "color",
      label: "Cor",
      placeholder: colorExample,
      required: true,
      width: "half",
      kind: "text",
    },
  ];
}

// --------------------------------------------------
//   Mapa central de configuração.
//   a tela só lê os campos daqui e desenha.
// --------------------------------------------------
export const VEHICLE_TYPES: VehicleTypeConfig[] = [
  {
    type: "motorcycle",
    label: "Moto",
    icon: "motorbike",
    fields: buildMotorizedFields("Honda", "CG 160 Start", "Vermelha"),
  },
  {
    type: "car",
    label: "Carro",
    icon: "truck",
    fields: buildMotorizedFields("Fiat", "Argo Drive", "Prata"),
  },
  {
    type: "bike",
    label: "Bike",
    icon: "bike",
    fields: [
      {
        name: "bikeType",
        label: "Tipo",
        placeholder: "",
        required: true,
        width: "full",
        kind: "options",
        options: [
          { value: "standard", label: "Comum" },
          { value: "electric", label: "Elétrica" },
        ],
      },
      {
        name: "color",
        label: "Cor",
        placeholder: "Preta",
        required: true,
        width: "half",
        kind: "text",
      },
      {
        name: "brand",
        label: "Marca",
        placeholder: "Caloi",
        required: false,
        width: "half",
        kind: "text",
      },
    ],
  },
];

// --------------------------------------------------
//   Valores iniciais. bikeType já começa preenchido
//   porque é uma escolha entre opções, não texto livre.
// --------------------------------------------------
const INITIAL_VALUES: VehicleFormValues = {
  brand: "",
  model: "",
  plate: "",
  year: "",
  color: "",
  bikeType: "standard",
};

// --------------------------------------------------
//   Placa no padrão Mercosul (ABC1D23): joga fora
//   qualquer caractere que não seja letra ou número,
//   força maiúsculas e corta em 7.
// --------------------------------------------------
function formatPlate(value: string) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 7);
}

// --------------------------------------------------
//  Ano aceita só dígitos.
// --------------------------------------------------
function formatYear(value: string) {
  return value.replace(/[^0-9]/g, "").slice(0, 4);
}

export function useVehicleForm() {
  const [selectedType, setSelectedType] = useState<VehicleType>("motorcycle");
  const [values, setValues] = useState<VehicleFormValues>(INITIAL_VALUES);

  const currentConfig = VEHICLE_TYPES.find(
    (item) => item.type === selectedType,
  )!;
  const visibleFields = currentConfig.fields;

  function handleChangeField(field: VehicleFieldName, value: string) {
    let formattedValue = value;

    if (field === "plate") {
      formattedValue = formatPlate(value);
    }

    if (field === "year") {
      formattedValue = formatYear(value);
    }

    setValues((previous) => ({ ...previous, [field]: formattedValue }));
  }

  function handleChangeType(nextType: VehicleType) {
    const nextFields = VEHICLE_TYPES.find(
      (item) => item.type === nextType,
    )!.fields;

    setValues((previous) => {
      const cleanedValues = { ...INITIAL_VALUES };

      nextFields.forEach((field) => {
        cleanedValues[field.name] = previous[field.name];
      });

      return cleanedValues;
    });

    setSelectedType(nextType);
  }

  const isFormValid = visibleFields
    .filter((field) => field.required)
    .every((field) => values[field.name].trim() !== "");

  return {
    vehicleTypes: VEHICLE_TYPES,
    selectedType,
    values,
    visibleFields,
    isFormValid,
    handleChangeType,
    handleChangeField,
  };
}
