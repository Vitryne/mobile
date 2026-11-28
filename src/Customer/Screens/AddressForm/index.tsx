import { FormInput } from "@/Customer/Components/FormInput";
import { PrimaryButton } from "@/Customer/Components/PrimaryButton";
import { SecundaryButton } from "@/Customer/Components/SecundaryButton";
import { useAddressForm } from "@/Customer/Hooks/useAddressForm";
import type { AddressFormField } from "@/Customer/Types/address";
import type { CustomerStackParamList } from "@/Customer/Types/navigation";
import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  type TextInputProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "@/Shared/Components/ScreenHeader";
import { styles } from "./styles";

type Props = NativeStackScreenProps<CustomerStackParamList, "AddressForm">;

type FieldConfig = {
  name: AddressFormField;
  label: string;
  placeholder: string;
  required: boolean;
  maxLength?: number;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
};

const FIELDS: FieldConfig[] = [
  {
    name: "zipCode",
    label: "CEP",
    placeholder: "00000-000",
    required: true,
    maxLength: 9,
    keyboardType: "numeric",
  },
  {
    name: "street",
    label: "Rua",
    placeholder: "Av. Brasil",
    required: true,
    maxLength: 200,
  },
  {
    name: "number",
    label: "Número",
    placeholder: "123",
    required: true,
    maxLength: 20,
  },
  {
    name: "neighborhood",
    label: "Bairro",
    placeholder: "Centro",
    required: true,
    maxLength: 100,
  },
  {
    name: "complement",
    label: "Complemento",
    placeholder: "Casa, Apto, Bloco...",
    required: false,
    maxLength: 150,
  },
  {
    name: "city",
    label: "Cidade",
    placeholder: "São Paulo",
    required: true,
    maxLength: 100,
  },
  {
    name: "state",
    label: "UF",
    placeholder: "SP",
    required: true,
    maxLength: 2,
    autoCapitalize: "characters",
  },
];

export function AddressForm({ navigation, route }: Props) {
  const addressId = route.params?.addressId;
  const form = useAddressForm(addressId);

  async function handleSubmit() {
    const success = await form.submit();

    if (success) navigation.goBack();
  }

  async function handleMakeDefault() {
    const success = await form.makeDefault();

    if (success) navigation.goBack();
  }

  const isBusy = form.submitting || form.selecting;

  const title = form.isEditing ? "Editar endereço" : "Novo endereço";

  if (form.loading) {
    return (
      <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
        <ScreenHeader title={title} />

        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (form.loadError) {
    return (
      <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
        <ScreenHeader title={title} />

        <View style={styles.center}>
          <Text style={styles.message_text}>{form.loadError}</Text>

          <Pressable
            style={styles.retry_button}
            onPress={form.reload}
            accessibilityRole="button"
          >
            <Text style={styles.retry_text}>Tentar novamente</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <ScreenHeader title={title} />

      <KeyboardAvoidingView
        style={commonStyles.flex_1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll_content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {FIELDS.map((field) => (
            <View key={field.name}>
              <FormInput
                label={field.label}
                required={field.required}
                placeholder={field.placeholder}
                value={form.values[field.name]}
                onChangeText={(value) => form.setField(field.name, value)}
                maxLength={field.maxLength}
                keyboardType={field.keyboardType}
                autoCapitalize={field.autoCapitalize}
                editable={!isBusy}
              />

              {form.errors[field.name] ? (
                <Text style={styles.field_error}>
                  {form.errors[field.name]}
                </Text>
              ) : null}
            </View>
          ))}

          {form.submitError ? (
            <Text style={styles.error_text}>{form.submitError}</Text>
          ) : null}
        </ScrollView>

        <View style={styles.footer}>
          {form.isEditing && !form.isSelected ? (
            <SecundaryButton
              label={
                form.selecting ? "Definindo..." : "Definir como endereço padrão"
              }
              onPress={handleMakeDefault}
              disabled={isBusy}
            />
          ) : null}

          <PrimaryButton
            label={form.submitting ? "Salvando..." : "Salvar endereço"}
            onPress={handleSubmit}
            disabled={isBusy}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
