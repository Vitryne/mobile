import { Feather } from '@expo/vector-icons';
import React from 'react';
import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

import { colors } from '../../../../../Shared/Styles/commonStyles';
import { FieldStatus } from '../../../../Types/paymentCard';
import { styles } from './styles';

type CardFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  status: FieldStatus;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'characters' | 'words';
  maxLength?: number;
  onChangeText: (text: string) => void;
  onBlur: () => void;
};

const CardField = ({
  label,
  value,
  placeholder,
  status,
  error,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  maxLength,
  onChangeText,
  onBlur,
}: CardFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} <Text style={styles.label_required}>*</Text>
      </Text>

      <View
        style={[
          styles.input_container,
          status === 'valid' && styles.input_container_valid,
          status === 'error' && styles.input_container_error,
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.description}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          maxLength={maxLength}
          onChangeText={onChangeText}
          onBlur={onBlur}
        />

        {status === 'valid' && <Feather name="check" size={18} color={colors.success} />}
      </View>

      {!!error && <Text style={styles.error_text}>{error}</Text>}
    </View>
  );
};

export default CardField;