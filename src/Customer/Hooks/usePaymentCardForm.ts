import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { mockSavePaymentCard } from '../../Customer/Screens/PaymentCard/mockPaymentCard';
import {
    CardBrand,
    FieldStatus,
    PaymentCardErrors,
    PaymentCardField,
    PaymentCardPreview,
    PaymentCardTouched,
    PaymentCardValues,
} from '../Types/paymentCard';

const initialValues: PaymentCardValues = {
  number: '',
  holderName: '',
  expiry: '',
  cvv: '',
  cpf: '',
};

const allFieldsTouched: PaymentCardTouched = {
  number: true,
  holderName: true,
  expiry: true,
  cvv: true,
  cpf: true,
};

const onlyDigits = (text: string) => text.replace(/\D/g, '');

const maskCardNumber = (text: string) =>
  onlyDigits(text)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ');

const maskExpiry = (text: string) => {
  const digits = onlyDigits(text).slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

const maskCpf = (text: string) =>
  onlyDigits(text)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const formatHolderName = (text: string) => text.toUpperCase().replace(/[^A-ZÀ-Ü ]/g, '');

const maskers: Record<PaymentCardField, (text: string) => string> = {
  number: maskCardNumber,
  holderName: formatHolderName,
  expiry: maskExpiry,
  cvv: (text) => onlyDigits(text).slice(0, 3),
  cpf: maskCpf,
};

const detectBrand = (digits: string): CardBrand => {
  if (digits.startsWith('4')) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(digits)) return 'mastercard';
  return 'other';
};

const isValidCpf = (cpf: string) => {
  const digits = onlyDigits(cpf);

  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;

  const calcDigit = (length: number) => {
    const sum = digits
      .slice(0, length)
      .split('')
      .reduce((total, digit, index) => total + Number(digit) * (length + 1 - index), 0);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return calcDigit(9) === Number(digits[9]) && calcDigit(10) === Number(digits[10]);
};

const validateExpiry = (expiry: string) => {
  if (!/^\d{2}\/\d{2}$/.test(expiry)) return 'Use o formato MM/AA';

  const month = Number(expiry.slice(0, 2));
  const year = 2000 + Number(expiry.slice(3));

  if (month < 1 || month > 12) return 'Mês inválido';

  const now = new Date();
  const isExpired =
    year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1);

  return isExpired ? 'Cartão vencido' : undefined;
};

const validateValues = (values: PaymentCardValues): PaymentCardErrors => {
  const errors: PaymentCardErrors = {};

  if (onlyDigits(values.number).length !== 16) {
    errors.number = 'Informe os 16 números do cartão';
  }

  if (values.holderName.trim().split(/\s+/).length < 2) {
    errors.holderName = 'Informe nome e sobrenome como no cartão';
  }

  const expiryError = validateExpiry(values.expiry);
  if (expiryError) errors.expiry = expiryError;

  if (values.cvv.length !== 3) {
    errors.cvv = 'CVV inválido';
  }

  if (!isValidCpf(values.cpf)) {
    errors.cpf = 'CPF inválido';
  }

  return errors;
};

export const usePaymentCardForm = () => {
  const navigation = useNavigation();

  const [values, setValues] = useState<PaymentCardValues>(initialValues);
  const [touched, setTouched] = useState<PaymentCardTouched>({});
  const [saveForLater, setSaveForLater] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errors = useMemo(() => validateValues(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  const preview = useMemo<PaymentCardPreview>(() => {
    const digits = onlyDigits(values.number);

    return {
      brand: detectBrand(digits),
      maskedNumber: `•••• •••• •••• ${digits.slice(12, 16).padEnd(4, '•')}`,
      holderName: values.holderName || 'NOME DO TITULAR',
      expiry: values.expiry || 'MM/AA',
    };
  }, [values]);

  const handleChange = (field: PaymentCardField, text: string) => {
    setValues((previous) => ({ ...previous, [field]: maskers[field](text) }));
  };

  const handleBlur = (field: PaymentCardField) => {
    setTouched((previous) => ({ ...previous, [field]: true }));
  };

  const getFieldStatus = (field: PaymentCardField): FieldStatus => {
    if (!errors[field]) return 'valid';
    return touched[field] ? 'error' : 'idle';
  };

  const getFieldError = (field: PaymentCardField) => (touched[field] ? errors[field] : undefined);

  const toggleSaveForLater = () => setSaveForLater((previous) => !previous);

  const goBack = () => navigation.goBack();

  const handleSubmit = async () => {
    if (!isValid) {
      setTouched(allFieldsTouched);
      return;
    }

    setIsSubmitting(true);

    try {
      await mockSavePaymentCard({
        brand: preview.brand,
        lastDigits: onlyDigits(values.number).slice(12, 16),
        holderName: values.holderName.trim(),
        expiry: values.expiry,
        holderCpf: onlyDigits(values.cpf),
        saveForLater,
      });

      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o cartão. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};