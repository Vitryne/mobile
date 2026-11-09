import { login } from "@/Customer/Api/auth";
import { ApiError } from "@/Shared/Api/apiConfig";
import { saveToken } from "@/Shared/Api/tokenStorage";
import { useState } from "react";

function getLoginErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401) return "E-mail ou senha incorretos.";
    if (error.status === 408) {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (error.status === 0) return "Sem conexão com o servidor.";
  }

  return "Não foi possível entrar. Tente novamente.";
}

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;

  const isFormValid = isEmailValid && isPasswordValid;

  function handleChangeEmail(value: string) {
    setEmail(value);
    setErrorMessage(null);
  }

  function handleChangePassword(value: string) {
    setPassword(value);
    setErrorMessage(null);
  }

  async function handleSubmit(): Promise<boolean> {
    if (!isFormValid) return false;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const session = await login({ email: email.trim(), password });

      if (!session.accessToken) {
        setErrorMessage("Não foi possível entrar. Tente novamente.");
        return false;
      }

      await saveToken(session.accessToken);
      return true;
    } catch (error) {
      setErrorMessage(getLoginErrorMessage(error));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    password,
    setPassword: handleChangePassword,
    email,
    setEmail: handleChangeEmail,
    isEmailValid,
    isPasswordValid,
    isFormValid,
    isSubmitting,
    errorMessage,
    handleSubmit,
  };
}
