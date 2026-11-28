import {
  createAddress,
  getAddress,
  selectAddress,
  updateAddress,
} from "@/Customer/Api/address";
import { formatCep, formatState } from "@/Customer/Hooks/addressForm";
import { getAddressErrorMessage } from "@/Customer/Hooks/useAddresses";
import {
  getOriginalDefaultAddressId,
  keepSelectedAsDefault,
} from "@/Customer/Hooks/useOrderAddress";
import type {
  AddressFormErrors,
  AddressFormField,
  AddressFormValues,
  AddressPayload,
  ClientAddress,
} from "@/Customer/Types/address";
import { ApiError } from "@/Shared/Api/apiConfig";
import { useEffect, useState } from "react";

const EMPTY_VALUES: AddressFormValues = {
  zipCode: "",
  street: "",
  number: "",
  neighborhood: "",
  complement: "",
  city: "",
  state: "",
};

const MAX_LENGTH: Record<AddressFormField, number> = {
  zipCode: 10,
  street: 200,
  number: 20,
  neighborhood: 100,
  complement: 150,
  city: 100,
  state: 2,
};

const REQUIRED_FIELDS: AddressFormField[] = [
  "zipCode",
  "street",
  "number",
  "neighborhood",
  "city",
  "state",
];

function toFormValues(address: ClientAddress): AddressFormValues {
  return {
    zipCode: formatCep(address.zipCode),
    street: address.street,
    number: address.number,
    neighborhood: address.neighborhood,
    complement: address.complement ?? "",
    city: address.city,
    state: formatState(address.state),
  };
}

function validate(values: AddressFormValues): AddressFormErrors {
  const errors: AddressFormErrors = {};

  for (const field of REQUIRED_FIELDS) {
    if (values[field].trim() === "") errors[field] = "Campo obrigatório.";
  }

  for (const field of Object.keys(MAX_LENGTH) as AddressFormField[]) {
    if (!errors[field] && values[field].trim().length > MAX_LENGTH[field]) {
      errors[field] = `Máximo de ${MAX_LENGTH[field]} caracteres.`;
    }
  }

  if (!errors.zipCode && values.zipCode.replace(/\D/g, "").length !== 8) {
    errors.zipCode = "Informe um CEP com 8 dígitos.";
  }

  if (!errors.state && !/^[A-Z]{2}$/.test(values.state)) {
    errors.state = "Informe a UF com 2 letras.";
  }

  return errors;
}

function toPayload(values: AddressFormValues): AddressPayload {
  return {
    zipCode: values.zipCode.trim(),
    street: values.street.trim(),
    number: values.number.trim(),
    neighborhood: values.neighborhood.trim(),
    complement: values.complement.trim() || undefined,
    city: values.city.trim(),
    state: values.state.trim().toUpperCase(),
  };
}

export function useAddressForm(addressId?: number) {
  const isEditing = addressId !== undefined;

  const [values, setValues] = useState<AddressFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<AddressFormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    if (addressId === undefined) return;

    let active = true;

    Promise.all([getAddress(addressId), getOriginalDefaultAddressId()])
      .then(([address, originalDefaultId]) => {
        if (active) {
          setValues(toFormValues(address));
          setIsSelected(
            originalDefaultId === null
              ? address.selected
              : originalDefaultId === address.id,
          );
        }
      })
      .catch((error) => {
        if (active) {
          setLoadError(
            getAddressErrorMessage(
              error,
              "Não foi possível carregar o endereço.",
            ),
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [addressId, reloadKey]);

  function setField(field: AddressFormField, value: string) {
    let formatted = value;

    if (field === "zipCode") formatted = formatCep(value);
    if (field === "state") formatted = formatState(value);

    setValues((previous) => ({ ...previous, [field]: formatted }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setSubmitError(null);
  }

  async function submit(): Promise<boolean> {
    if (submitting) return false;

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return false;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = toPayload(values);

      if (addressId !== undefined) {
        await updateAddress(addressId, payload);
      } else {
        await createAddress(payload);
      }

      return true;
    } catch (error) {
      if (error instanceof ApiError && error.fields) {
        setErrors(error.fields as AddressFormErrors);
      }

      setSubmitError(
        getAddressErrorMessage(error, "Não foi possível salvar o endereço."),
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  async function makeDefault(): Promise<boolean> {
    if (addressId === undefined || selecting || submitting) return false;

    setSelecting(true);
    setSubmitError(null);

    try {
      await selectAddress(addressId);
      await keepSelectedAsDefault();
      setIsSelected(true);
      return true;
    } catch (error) {
      setSubmitError(
        getAddressErrorMessage(
          error,
          "Não foi possível definir o endereço padrão.",
        ),
      );
      return false;
    } finally {
      setSelecting(false);
    }
  }

  function reload() {
    setLoading(true);
    setLoadError(null);
    setReloadKey((key) => key + 1);
  }

  return {
    values,
    errors,
    submitError,
    submitting,
    loading,
    loadError,
    isEditing,
    isSelected,
    selecting,
    setField,
    submit,
    makeDefault,
    reload,
  };
}
