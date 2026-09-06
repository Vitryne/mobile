import { useState } from "react";

const MOCKED_USER = {
    email: "teste@gmail.com",
    password: "123456",
};

export function useLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;

    const isFormValid = isEmailValid && isPasswordValid;

    async function handleSubmit(): Promise<boolean> {
        if (!isFormValid) return false;

        setIsSubmitting(true);

        // Quando tiver backend trocar por chamada real de API quando o backend estiver pronto
        await new Promise((resolve) => setTimeout(resolve, 800));

        const isValidUser =
            email.trim().toLowerCase() === MOCKED_USER.email &&
            password === MOCKED_USER.password;

        setIsSubmitting(false);

        return isValidUser;
    }

    return {
        password,
        setPassword,
        email,
        setEmail,
        isEmailValid,
        isPasswordValid,
        isFormValid,
        isSubmitting,
        handleSubmit,
    };
}