import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRegisterForm } from "../../../../Hooks/registroForm";
import { FormInput } from "../../Components/FormInput";
import { PasswordStrength } from "../../Components/PasswordStrength";
import { PrimaryButton } from "../../Components/PrimaryButton";
import { styles } from "./styles";

export function Register1() {
  const form = useRegisterForm();

  function handleContinue() {
    // navegação para a etapa 2
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Crie sua conta de entregador</Text>
        <Text style={styles.subtitle}>Passo 1 de 4 · Dados pessoais</Text>

        <FormInput
          label="Nome Completo"
          required
          placeholder="Rafael Monteiro"
          value={form.fullName}
          onChangeText={form.setFullName}
          isValid={form.isFullNameValid}
          autoCapitalize="words"
        />

        <FormInput
          label="CPF"
          required
          placeholder="000.000.000-00"
          value={form.cpf}
          onChangeText={form.setCpf}
          isValid={form.isCpfValid}
          keyboardType="numeric"
        />

        <FormInput
          label="E-mail"
          required
          placeholder="rafael@email.com"
          value={form.email}
          onChangeText={form.setEmail}
          isValid={form.isEmailValid}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormInput
          label="Telefone"
          required
          placeholder="(00) 00000-0000"
          value={form.phone}
          onChangeText={form.setPhone}
          isValid={form.isPhoneValid}
          keyboardType="phone-pad"
        />

        <FormInput
          label="Senha"
          required
          isPassword
          placeholder="••••••••"
          value={form.password}
          onChangeText={form.setPassword}
          isValid={form.isPasswordValid}
        />

        <PasswordStrength score={form.passwordScore} />

        <Text style={styles.passwordHint}>
          Mínimo 6 caracteres, com 1 número e 1 letra maiúscula.
        </Text>

        <FormInput
          label="Confirmar senha"
          required
          isPassword
          placeholder="••••••••"
          value={form.confirmPassword}
          onChangeText={form.setConfirmPassword}
          isValid={form.isConfirmPasswordValid}
        />
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          label="Continuar"
          onPress={handleContinue}
          disabled={!form.isFormValid}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
