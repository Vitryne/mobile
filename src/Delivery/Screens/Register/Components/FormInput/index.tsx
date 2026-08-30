import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./styles";

type FormInputProps = TextInputProps & {
  label: string;
  required?: boolean;
  isValid?: boolean;
  helperText?: string;
  isPassword?: boolean;
};

export function FormInput({
  label,
  required = false,
  isValid = false,
  helperText,
  isPassword = false,
  ...rest
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          isValid && styles.inputWrapperValid,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor="#C4C4C4"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && isHidden}
          {...rest}
        />

        {isValid && <Feather name="check" size={18} color="#16A34A" />}

        {isPassword && (
          <TouchableOpacity onPress={() => setIsHidden(!isHidden)} hitSlop={8}>
            <Feather
              name={isHidden ? "eye-off" : "eye"}
              size={18}
              color="#9A9A9A"
            />
          </TouchableOpacity>
        )}
      </View>

      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}
