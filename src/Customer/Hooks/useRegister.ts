import { login } from "@/Customer/Api/auth";
import { registerClient } from "@/Customer/Api/register";
import type {
  RegisterClientForm,
  RegisterOutcome,
} from "@/Customer/Types/register";
import { ApiError } from "@/Shared/Api/apiConfig";
import { saveToken } from "@/Shared/Api/tokenStorage";
import { useState } from "react";
import { clearRegisterPassword, getRegisterPassword } from "./registerDraft";

const FIELD_LABELS: Record<string, string> = {
  name: "Nome",
  cpf: "CPF",
  email: "E-mail",
  password: "Senha",
};

function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function getPasswordScore(password: string) {
  if (password.length < 8) return 0;

  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);

  if (!hasNumber || !hasUpperCase) return 1;
  if (password.length >= 10) return 3;

  return 2;
}

function getFieldLabel(field: string) {
  if (field.startsWith("address")) return "Endereço";

  return FIELD_LABELS[field] ?? field;
}

function getRegisterErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 409) return "E-mail ou CPF já cadastrado.";
    if (error.status === 400) {
      const labels = Array.from(
        new Set(Object.keys(error.fields ?? {}).map(getFieldLabel)),
      );

      if (labels.length > 0) {
        return `Confira estes campos: ${labels.join(", ")}.`;
      }

      return "Dados inválidos. Confira o cadastro e tente novamente.";
    }
    if (error.status === 408) {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (error.status === 0) return "Sem conexão com o servidor.";
  }

  return "Não foi possível finalizar o cadastro. Tente novamente.";
}

type RegisterInitialValues = {
  fullName?: string;
  cpf?: string;
  email?: string;
};

export function useRegister(initialValues?: RegisterInitialValues) {
  const [fullName, setFullName] = useState(initialValues?.fullName ?? "");
  const [cpf, setCpf] = useState(initialValues?.cpf ?? "");
  const [email, setEmail] = useState(initialValues?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const passwordScore = getPasswordScore(password);

  const isFullNameValid = fullName.trim().length >= 3;
  const isCpfValid = cpf.replace(/\D/g, "").length === 11;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = passwordScore >= 2;

  const isConfirmPasswordValid =
    confirmPassword.length > 0 && confirmPassword === password;

  const isPersonalDataValid = isFullNameValid && isCpfValid && isEmailValid;

  const isFormValid =
    isPersonalDataValid && isPasswordValid && isConfirmPasswordValid;

  async function handleSubmit(
    form: RegisterClientForm,
  ): Promise<RegisterOutcome> {
    const draftPassword = getRegisterPassword();
    const formEmail = form.email.trim();

    if (!draftPassword) {
      setErrorMessage("Volte ao passo 1 e digite a senha novamente.");
      return "failed";
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await registerClient({
        name: form.fullName.trim(),
        cpf: form.cpf,
        email: formEmail,
        password: draftPassword,
        address: {
          zipCode: form.cep,
          street: form.street.trim(),
          number: form.number.trim(),
          neighborhood: form.neighborhood.trim(),
          complement: form.complement?.trim() || undefined,
          city: form.city.trim(),
          state: form.state.trim().toUpperCase(),
        },
      });
    } catch (error) {
      setErrorMessage(getRegisterErrorMessage(error));
      setIsSubmitting(false);
      return "failed";
    }

    try {
      const session = await login({
        email: formEmail,
        password: draftPassword,
      });

      if (!session.accessToken) return "registered";

      await saveToken(session.accessToken);
      return "logged_in";
    } catch {
      return "registered";
    } finally {
      clearRegisterPassword();
      setIsSubmitting(false);
    }
  }

  return {
    fullName,
    setFullName,

    cpf,
    setCpf: (value: string) => setCpf(maskCpf(value)),

    email,
    setEmail,

    password,
    setPassword,

    confirmPassword,
    setConfirmPassword,

    passwordScore,

    isFullNameValid,
    isCpfValid,
    isEmailValid,
    isPasswordValid,
    isConfirmPasswordValid,

    isPersonalDataValid,
    isFormValid,

    isSubmitting,
    errorMessage,
    handleSubmit,
  };
}
