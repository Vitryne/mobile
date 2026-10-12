import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { PrimaryButton } from "../../../../Components/PrimaryButton";
import { CustomerStackParamList } from "../../../../Types/navigation";
import { RegisterHeader } from "../../Components/RegisterHeader";
import { styles } from "./styles";

const CODE_LENGTH = 6;
const MAX_ATTEMPTS = 3;
const RESEND_COOLDOWN_SECONDS = 38;
const LOCK_DURATION_SECONDS = 5 * 60;

// Só pra essa tela funcionar sem backend ainda - troque pela validação real
const MOCK_CORRECT_CODE = "000000";

type Status = "idle" | "error" | "locked";

type Props = NativeStackScreenProps<
  CustomerStackParamList,
  "RegisterAuthenticator"
>;

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function RegisterAuthenticator({ navigation, route }: Props) {
  const { email } = route.params;
  const inputRef = useRef<TextInput>(null);
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN_SECONDS);
  const [lockSeconds, setLockSeconds] = useState(LOCK_DURATION_SECONDS);

  // Contagem pro "Reenviar em 0:38" - só corre enquanto não está bloqueado
  useEffect(() => {
    if (status === "locked" || resendSeconds <= 0) return;

    const timer = setInterval(() => {
      setResendSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [status, resendSeconds]);

  // Contagem do bloqueio temporário - some sozinha e libera de novo
  useEffect(() => {
    if (status !== "locked") return;

    if (lockSeconds <= 0) {
      setStatus("idle");
      setAttemptsLeft(MAX_ATTEMPTS);
      setCode("");
      setResendSeconds(RESEND_COOLDOWN_SECONDS);
      return;
    }

    const timer = setInterval(() => {
      setLockSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [status, lockSeconds]);

  const handleChangeCode = useCallback((value: string) => {
    const digitsOnly = value.replace(/[^0-9]/g, "").slice(0, CODE_LENGTH);
    setCode(digitsOnly);
  }, []);

  const handleResend = useCallback(() => {
    if (resendSeconds > 0 || status === "locked") return;
    setStatus("idle");
    setCode("");
    setResendSeconds(RESEND_COOLDOWN_SECONDS);
    inputRef.current?.focus();
  }, [resendSeconds, status]);

  const handleVerify = useCallback(() => {
    if (code.length < CODE_LENGTH || status === "locked") return;

    console.log(
      "Código digitado:",
      code,
      "| Código esperado (mock):",
      MOCK_CORRECT_CODE,
    );

    if (code === MOCK_CORRECT_CODE) {
      navigation.navigate("MenuCarrinho");
      return;
    }

    const remaining = attemptsLeft - 1;

    if (remaining <= 0) {
      setStatus("locked");
      setLockSeconds(LOCK_DURATION_SECONDS);
    } else {
      setAttemptsLeft(remaining);
      setStatus("error");
    }
  }, [code, status, attemptsLeft, navigation]);

  const isLocked = status === "locked";
  const canVerify = code.length === CODE_LENGTH && !isLocked;

  const boxes = useMemo(
    () => Array.from({ length: CODE_LENGTH }, (_, index) => index),
    [],
  );

  return (
    <View style={styles.container}>
      <RegisterHeader currentStep={2} />

      <View style={styles.content}>
        <Text style={styles.title}>Confirme que é você.</Text>
        <Text style={styles.subtitle}>
          Passo 2 de 4 · Validação de dois fatores
        </Text>

        <Text style={styles.paragraph}>
          Enviamos um código de 6 dígitos para{" "}
          <Text style={styles.paragraphHighlight}>{email}</Text>. Ele vale por 5
          minutos.
        </Text>

        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={handleChangeCode}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="number-pad"
          maxLength={CODE_LENGTH}
          editable={!isLocked}
          style={styles.hiddenInput}
        />

        <Pressable
          style={styles.codeRow}
          onPress={() => !isLocked && inputRef.current?.focus()}
        >
          {boxes.map((index) => {
            const digit = code[index];
            const isCurrent = index === code.length && isFocused && !isLocked;
            const isErrorBox = status === "error";

            return (
              <View
                key={index}
                style={[
                  styles.codeBox,
                  isCurrent && styles.codeBoxFocused,
                  isErrorBox && styles.codeBoxError,
                  isLocked && styles.codeBoxLocked,
                ]}
              >
                {digit ? (
                  <Text
                    style={[
                      styles.codeDigit,
                      isErrorBox && styles.codeDigitError,
                      isLocked && styles.codeDigitLocked,
                    ]}
                  >
                    {digit}
                  </Text>
                ) : isCurrent ? (
                  <View style={styles.codeCursor} />
                ) : null}
              </View>
            );
          })}
        </Pressable>

        {status === "locked" ? (
          <View style={styles.helperRow}>
            <Feather name="clock" size={14} color={colors.textMuted} />
            <Text style={styles.lockedText}>
              Muitas tentativas. Tente novamente em {formatSeconds(lockSeconds)}
              .
            </Text>
          </View>
        ) : status === "error" ? (
          <View style={styles.helperRowBetween}>
            <View style={styles.helperRow}>
              <Feather name="x" size={14} color={colors.danger} />
              <Text style={styles.errorText}>
                Código incorreto. Restam {attemptsLeft} tentativa
                {attemptsLeft === 1 ? "" : "s"} antes do bloqueio temporário.
              </Text>
            </View>
            <Pressable onPress={handleResend} hitSlop={8}>
              <Text style={styles.resendLink}>Reenviar</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.helperRowBetween}>
            <Text style={styles.helperText}>Não recebeu o código?</Text>
            {resendSeconds > 0 ? (
              <Text style={styles.helperTextMuted}>
                Reenviar em {formatSeconds(resendSeconds)}
              </Text>
            ) : (
              <Pressable onPress={handleResend} hitSlop={8}>
                <Text style={styles.resendLink}>Reenviar</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 30 }]}>
        <PrimaryButton
          label="Verificar e continuar"
          onPress={handleVerify}
          disabled={!canVerify}
          icon={<Feather name="arrow-right" size={18} color="#FFFFFF" />}
        />

        <View style={styles.securityNote}>
          <Feather name="lock" size={14} color={colors.textMuted} />
          <Text style={styles.securityNoteText}>
            Seus documentos são criptografados e usados só para verificação.
          </Text>
        </View>
      </View>
    </View>
  );
}
