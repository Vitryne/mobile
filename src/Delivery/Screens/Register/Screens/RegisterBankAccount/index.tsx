import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { FormInput } from "../../../../Components/FormInput";
import { useBankAccountForm } from "../../../../Hooks/useBankAccountForm";
import { PrimaryButton } from "../../Components/PrimaryButton";
import { RegisterHeader } from "../../Components/RegisterHeader";
import { BANKS } from "./banks";
import { styles } from "./styles";

export function RegisterBankAccount() {
  const {
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
  } = useBankAccountForm();

  const [isBankModalOpen, setIsBankModalOpen] = useState(false);

  return (
    <View style={styles.container}>
      <RegisterHeader currentStep={4} />

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
          <Text style={styles.title}>Onde receber seus ganhos</Text>
          <Text style={styles.subtitle}>Passo 4 de 4 · Dados bancários</Text>

          <View style={styles.field_group}>
            <Text style={styles.label}>
              Banco<Text style={styles.required}> *</Text>
            </Text>

            <Pressable
              style={styles.bank_field}
              onPress={() => setIsBankModalOpen(true)}
            >
              <Text
                style={bankName ? styles.bank_value : styles.bank_placeholder}
              >
                {bankName || "Selecione o banco"}
              </Text>
              <Feather name="chevron-down" size={20} color={colors.textMuted} />
            </Pressable>
          </View>

          <View style={styles.row}>
            <View style={styles.row_item}>
              <FormInput
                label="Agência"
                required
                placeholder="0001"
                value={agency}
                onChangeText={setAgency}
                isValid={isAgencyValid}
                keyboardType="numeric"
                maxLength={4}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={focusAccount}
              />
            </View>

            <View style={styles.row_item}>
              <FormInput
                ref={accountRef}
                label="Conta"
                required
                placeholder="00000-1"
                value={account}
                onChangeText={setAccount}
                isValid={isAccountValid}
                keyboardType="numeric"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={focusPixKey}
              />
            </View>
          </View>

          <FormInput
            ref={pixKeyRef}
            label="Chave PIX"
            placeholder="CPF, e-mail, telefone ou chave aleatória"
            value={pixKey}
            onChangeText={setPixKey}
            isValid={isPixKeyValid}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          <Text style={styles.notice}>
            A conta precisa estar no mesmo CPF informado no passo 1.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>

      {!isKeyboardVisible && (
        <View style={styles.footer}>
          <PrimaryButton
            label="Concluir Cadastro"
            onPress={handleFinish}
            disabled={!isFormValid}
          />
        </View>
      )}

      <Modal
        visible={isBankModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsBankModalOpen(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setIsBankModalOpen(false)}
        />

        <View style={styles.sheet}>
          <Text style={styles.sheet_title}>Selecione o banco</Text>

          <FlatList
            data={BANKS}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => {
              const isSelected = bankName === item.name;

              return (
                <Pressable
                  style={[styles.option, isSelected && styles.option_selected]}
                  onPress={() => {
                    handleSelectBank(item);
                    setIsBankModalOpen(false);
                  }}
                >
                  <Text style={styles.option_code}>{item.code}</Text>
                  <Text style={styles.option_name}>{item.name}</Text>

                  {isSelected && (
                    <Feather name="check" size={20} color={colors.primary} />
                  )}
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}
