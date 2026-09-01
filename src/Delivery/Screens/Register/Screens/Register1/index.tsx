import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import { useRegisterForm } from "../../../../Hooks/registroForm";
import { FormInput } from "../../Components/FormInput";
import { PasswordStrength } from "../../Components/PasswordStrength";
import { PrimaryButton } from "../../Components/PrimaryButton";
import { RegisterHeader } from "../../Components/RegisterHeader";
import { styles } from "./styles";

export function Register1() {
  const form = useRegisterForm();

  const scrollViewRef = useRef<ScrollView>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const cpfRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;

    const showSub = Keyboard.addListener(showEvent, () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
      }
      setIsKeyboardVisible(true);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      hideTimeout = setTimeout(() => {
        setIsKeyboardVisible(false);
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }, 80);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  function handleContinue() {
    // navegação para a etapa 2
  }

  return (
    <View style={styles.container}>
      <RegisterHeader currentStep={1} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.scroll_content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Crie sua conta de</Text>
          <Text style={styles.title}>entregador</Text>
          <Text style={styles.subtitle}>Passo 1 de 4 · Dados pessoais</Text>

          <FormInput
            label="Nome Completo"
            required
            placeholder="Rafael Monteiro"
            value={form.fullName}
            onChangeText={form.setFullName}
            isValid={form.isFullNameValid}
            autoCapitalize="words"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => cpfRef.current?.focus()}
          />

          <FormInput
            ref={cpfRef}
            label="CPF"
            required
            placeholder="000.000.000-00"
            value={form.cpf}
            onChangeText={form.setCpf}
            isValid={form.isCpfValid}
            keyboardType="numeric"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => emailRef.current?.focus()}
          />

          <FormInput
            ref={emailRef}
            label="E-mail"
            required
            placeholder="rafael@email.com"
            value={form.email}
            onChangeText={form.setEmail}
            isValid={form.isEmailValid}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => phoneRef.current?.focus()}
          />

          <FormInput
            ref={phoneRef}
            label="Telefone"
            required
            placeholder="(00) 00000-0000"
            value={form.phone}
            onChangeText={form.setPhone}
            isValid={form.isPhoneValid}
            keyboardType="phone-pad"
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <FormInput
            ref={passwordRef}
            label="Senha"
            required
            isPassword
            placeholder="Senha"
            value={form.password}
            onChangeText={form.setPassword}
            isValid={form.isPasswordValid}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
          />

          <PasswordStrength score={form.passwordScore} />

          <Text style={styles.password_hint}>
            Mínimo 6 caracteres, com 1 número e 1 letra maiúscula.
          </Text>

          <FormInput
            ref={confirmPasswordRef}
            label="Confirmar senha"
            required
            isPassword
            placeholder="Senha"
            value={form.confirmPassword}
            onChangeText={form.setConfirmPassword}
            isValid={form.isConfirmPasswordValid}
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {!isKeyboardVisible && (
        <View style={styles.footer}>
          <PrimaryButton
            label="Continuar"
            onPress={handleContinue}
            disabled={!form.isFormValid}
          />
        </View>
      )}
    </View>
  );
}