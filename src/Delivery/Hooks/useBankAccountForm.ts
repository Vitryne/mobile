import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Platform, ScrollView, TextInput } from "react-native";
import { Bank } from "../Screens/Register/Screens/RegisterBankAccount/banks";

export function useBankAccountForm() {
  const navigation = useNavigation();

  const [bankCode, setBankCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [agency, setAgency] = useState("");
  const [account, setAccount] = useState("");
  const [pixKey, setPixKey] = useState("");

  const scrollViewRef = useRef<ScrollView>(null);
  const accountRef = useRef<TextInput>(null);
  const pixKeyRef = useRef<TextInput>(null);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const isBankValid = bankCode.length > 0;
  const isAgencyValid = agency.replace(/\D/g, "").length === 4;
  const isAccountValid = account.replace(/\D/g, "").length >= 5;

  /* PIX é opcional: vazio conta como válido. */
  const isPixKeyValid = pixKey.length === 0 || pixKey.trim().length >= 5;

  const isFormValid =
    isBankValid && isAgencyValid && isAccountValid && isPixKeyValid;

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

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

  function handleSelectBank(bank: Bank) {
    setBankCode(bank.code);
    setBankName(bank.name);
  }

  function focusAccount() {
    accountRef.current?.focus();
  }

  function focusPixKey() {
    pixKeyRef.current?.focus();
  }

  function handleFinish() {
    Keyboard.dismiss();

    console.log("Dados bancários:", {
      bankCode,
      agency: agency.replace(/\D/g, ""),
      account: account.replace(/\D/g, ""),
      pixKey: pixKey.trim(),
    });

    navigation.navigate("RegisterSuccess");
  }

  return {
    bankName,
    agency,
    setAgency,
    account,
    setAccount,
    pixKey,
    setPixKey,
    isAgencyValid,
    isAccountValid,
    isPixKeyValid,
    isFormValid,
    scrollViewRef,
    accountRef,
    pixKeyRef,
    isKeyboardVisible,
    handleSelectBank,
    handleFinish,
    focusAccount,
    focusPixKey,
  };
}
