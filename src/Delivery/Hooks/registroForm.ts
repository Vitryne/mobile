import { useState } from "react";

function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function getPasswordScore(password: string) {
  if (password.length < 6) return 0;

  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);

  if (!hasNumber || !hasUpperCase) return 1;
  if (password.length >= 10) return 3;

  return 2;
}

export function useRegisterForm() {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordScore = getPasswordScore(password);

  const isFullNameValid = fullName.trim().length >= 3;
  const isCpfValid = cpf.replace(/\D/g, "").length === 11;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = phone.replace(/\D/g, "").length === 11;
  const isPasswordValid = passwordScore >= 2;
  const isConfirmPasswordValid =
    confirmPassword.length > 0 && confirmPassword === password;

  const isFormValid =
    isFullNameValid &&
    isCpfValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  return {
    fullName,
    setFullName,
    cpf,
    setCpf: (value: string) => setCpf(maskCpf(value)),
    email,
    setEmail,
    phone,
    setPhone: (value: string) => setPhone(maskPhone(value)),
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordScore,
    isFullNameValid,
    isCpfValid,
    isEmailValid,
    isPhoneValid,
    isPasswordValid,
    isConfirmPasswordValid,
    isFormValid,
  };
}
