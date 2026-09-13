import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVehicleForm } from "../../../../Hooks/useVehicleForm";
import type { VehicleFieldWidth } from "../../../../Types/vehicle";
import { PrimaryButton } from "../../Components/PrimaryButton";
import { RegisterHeader } from "../../Components/RegisterHeader";
import { styles } from "./styles";

const FIELD_WIDTH_STYLES: Record<VehicleFieldWidth, object> = {
  full: styles.field_full,
  half: styles.field_half,
  wide: styles.field_wide,
  narrow: styles.field_narrow,
};

export function RegisterVehicle() {
  const {
    vehicleTypes,
    selectedType,
    values,
    visibleFields,
    isFormValid,
    handleChangeType,
    handleChangeField,
  } = useVehicleForm();

  function handleContinue() {
    // navegação para a etapa 4
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <RegisterHeader currentStep={3} />

      <ScrollView
        style={commonStyles.flex_1}
        contentContainerStyle={styles.scroll_content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Dados do veículo</Text>
        <Text style={styles.subtitle}>Passo 3 de 4 · Veículo</Text>
        <Text style={styles.section_label}>Tipo de veículo</Text>

        <View style={styles.vehicle_row}>
          {vehicleTypes.map((vehicle) => {
            const isSelected = selectedType === vehicle.type;

            return (
              <TouchableOpacity
                key={vehicle.type}
                style={[
                  styles.vehicle_card,
                  isSelected && styles.vehicle_card_selected,
                ]}
                onPress={() => handleChangeType(vehicle.type)}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name={vehicle.icon}
                  size={28}
                  color={isSelected ? colors.primary : colors.text}
                />
                <Text
                  style={[
                    styles.vehicle_label,
                    isSelected && styles.vehicle_label_selected,
                  ]}
                >
                  {vehicle.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.fields_wrapper}>
          {visibleFields.map((field) => (
            <View key={field.name} style={FIELD_WIDTH_STYLES[field.width]}>
              <Text style={styles.input_label}>
                {field.label}{" "}
                {field.required && <Text style={styles.required_mark}>*</Text>}
              </Text>

              {field.kind === "options" ? (
                /* Campo de escolha: usado no tipo da bike */
                <View style={styles.option_row}>
                  {field.options?.map((option) => {
                    const isSelected = values[field.name] === option.value;

                    return (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.option_button,
                          isSelected && styles.option_button_selected,
                        ]}
                        onPress={() =>
                          handleChangeField(field.name, option.value)
                        }
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.option_label,
                            isSelected && styles.option_label_selected,
                          ]}
                        >
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : (
                /* Campo de texto comum */
                <TextInput
                  style={styles.input}
                  value={values[field.name]}
                  onChangeText={(text) => handleChangeField(field.name, text)}
                  placeholder={field.placeholder}
                  placeholderTextColor={colors.textMuted}
                  keyboardType={field.keyboardType ?? "default"}
                  autoCapitalize={field.autoCapitalize ?? "sentences"}
                  maxLength={field.maxLength}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          label="Continuar"
          onPress={handleContinue}
          disabled={!isFormValid}
        />
      </View>
    </SafeAreaView>
  );
}
