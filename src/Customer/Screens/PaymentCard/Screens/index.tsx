import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, commonStyles } from '../../../../Shared/Styles/commonStyles';
import { usePaymentCardForm } from '../../../Hooks/usePaymentCardForm';
import CardField from '../Components/CardField';
import CardPreview from '../Components/CardPreview';
import { styles } from './styles';

export const PaymentCardScreen = () => {
  const {
    values,
    preview,
    saveForLater,
    isSubmitting,
    getFieldStatus,
    getFieldError,
    handleChange,
    handleBlur,
    toggleSaveForLater,
    handleSubmit,
    goBack,
  } = usePaymentCardForm();

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back_button} onPress={goBack}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Novo cartão</Text>
      </View>

      <ScrollView
        contentContainerStyle={commonStyles.scroll_content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <CardPreview preview={preview} />

        <View style={styles.form}>
          <CardField
            label="Número do cartão"
            value={values.number}
            placeholder="0000 0000 0000 0000"
            keyboardType="number-pad"
            status={getFieldStatus('number')}
            error={getFieldError('number')}
            onChangeText={(text) => handleChange('number', text)}
            onBlur={() => handleBlur('number')}
          />

          <CardField
            label="Nome impresso"
            value={values.holderName}
            placeholder="COMO ESTÁ NO CARTÃO"
            autoCapitalize="characters"
            status={getFieldStatus('holderName')}
            error={getFieldError('holderName')}
            onChangeText={(text) => handleChange('holderName', text)}
            onBlur={() => handleBlur('holderName')}
          />

          <View style={[commonStyles.row, styles.fields_row]}>
            <View style={styles.row_item}>
              <CardField
                label="Validade"
                value={values.expiry}
                placeholder="MM/AA"
                keyboardType="number-pad"
                status={getFieldStatus('expiry')}
                error={getFieldError('expiry')}
                onChangeText={(text) => handleChange('expiry', text)}
                onBlur={() => handleBlur('expiry')}
              />
            </View>

            <View style={styles.row_item}>
              <CardField
                label="CVV"
                value={values.cvv}
                placeholder="•••"
                keyboardType="number-pad"
                secureTextEntry
                status={getFieldStatus('cvv')}
                error={getFieldError('cvv')}
                onChangeText={(text) => handleChange('cvv', text)}
                onBlur={() => handleBlur('cvv')}
              />
            </View>
          </View>

          <CardField
            label="CPF do titular"
            value={values.cpf}
            placeholder="000.000.000-00"
            keyboardType="number-pad"
            status={getFieldStatus('cpf')}
            error={getFieldError('cpf')}
            onChangeText={(text) => handleChange('cpf', text)}
            onBlur={() => handleBlur('cpf')}
          />
        </View>

        <View style={styles.info_box}>
          <Feather name="check" size={16} color={colors.success} />
          <Text style={styles.info_text}>
            Dados tokenizados pelo gateway — o app não armazena o cartão completo.
          </Text>
        </View>

        <TouchableOpacity style={styles.checkbox_row} onPress={toggleSaveForLater}>
          <View style={[styles.checkbox, saveForLater && styles.checkbox_checked]}>
            {saveForLater && <Feather name="check" size={14} color={colors.white} />}
          </View>
          <Text style={styles.checkbox_label}>Salvar cartão para próximas compras</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            commonStyles.button,
            styles.submit_button,
            isSubmitting && styles.submit_button_disabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <>
              <Feather name="check" size={18} color={colors.white} />
              <Text style={commonStyles.button_text}>Salvar cartão</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};