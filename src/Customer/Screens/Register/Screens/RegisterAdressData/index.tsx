import { commonStyles } from "@/Shared/Styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { FormInput } from "../../../../Components/FormInput";
import { PrimaryButton } from "../../../../Components/PrimaryButton";
import { useAddressForm } from "../../../../Hooks/addressForm";
import { RegisterHeader } from "../../Components/RegisterHeader";
import { styles } from "./styles";

export function RegisterAddresData() {
  const form = useAddressForm();

  const scrollViewRef = useRef<ScrollView>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const navigation = useNavigation();

  const cepRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const streetRef = useRef<TextInput>(null);
  const numberRef = useRef<TextInput>(null);
  const neighborhoodRef = useRef<TextInput>(null);
  const complementRef = useRef<TextInput>(null);

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

  function handleContinue() {
    navigation.navigate("MenuCarrinho");
  }

  return (
    <View style={styles.container}>
      <RegisterHeader currentStep={3} />

      <KeyboardAvoidingView
        style={commonStyles.flex_1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          ref={scrollViewRef}
          style={commonStyles.flex_1}
          contentContainerStyle={styles.scroll_content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Onde você recebe?</Text>
          <Text style={styles.subtitle}>
            Passo 3 de 4 · Endereço de entrega
          </Text>

          <FormInput
            ref={cepRef}
            label="CEP"
            required
            placeholder="00000-000"
            value={form.values.cep}
            onChangeText={(value) => form.handleChangeField("cep", value)}
            isValid={form.isCepValid}
            keyboardType="numeric"
            maxLength={9}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => cityRef.current?.focus()}
          />

          {form.isFetchingCep && (
            <Text style={styles.subtitle}>Buscando endereço...</Text>
          )}

          {form.isCepInvalid && (
            <Text style={[styles.subtitle, { color: "#E33232" }]}>
              CEP não encontrado. Confira e tente novamente.
            </Text>
          )}

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <FormInput
                ref={cityRef}
                label="Cidade"
                required
                placeholder="Av. Brasil"
                value={form.values.city}
                onChangeText={(value) => form.handleChangeField("city", value)}
                isValid={form.isCityValid}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => stateRef.current?.focus()}
              />
            </View>

            <View style={{ width: 70 }}>
              <FormInput
                ref={stateRef}
                label="UF"
                required
                placeholder="UF"
                value={form.values.state}
                onChangeText={(value) => form.handleChangeField("state", value)}
                isValid={form.isStateValid}
                autoCapitalize="characters"
                maxLength={2}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => streetRef.current?.focus()}
              />
            </View>
          </View>

          <FormInput
            ref={streetRef}
            label="Endereço"
            required
            placeholder="Av. Brasil"
            value={form.values.street}
            onChangeText={(value) => form.handleChangeField("street", value)}
            isValid={form.isStreetValid}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => numberRef.current?.focus()}
          />

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <FormInput
                ref={numberRef}
                label="Número"
                required
                placeholder="123"
                value={form.values.number}
                onChangeText={(value) =>
                  form.handleChangeField("number", value)
                }
                isValid={form.isNumberValid}
                keyboardType="numeric"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => neighborhoodRef.current?.focus()}
              />
            </View>

            <View style={{ flex: 1 }}>
              <FormInput
                ref={neighborhoodRef}
                label="Bairro"
                required
                placeholder="Centro, Zona..."
                value={form.values.neighborhood}
                onChangeText={(value) =>
                  form.handleChangeField("neighborhood", value)
                }
                isValid={form.isNeighborhoodValid}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => complementRef.current?.focus()}
              />
            </View>
          </View>

          <FormInput
            ref={complementRef}
            label="Complemento"
            placeholder="Casa, Apto, Bloco..."
            value={form.values.complement}
            onChangeText={(value) =>
              form.handleChangeField("complement", value)
            }
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          <View style={{ marginTop: 24 }}>
            <PrimaryButton
              label="Continuar"
              onPress={handleContinue}
              disabled={!form.isFormValid}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
