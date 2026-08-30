import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { StepIndicator } from "../StepIndicator";
import { styles } from "./styles";

type RegisterHeaderProps = {
  currentStep: number;
  totalSteps?: number;
};

export function RegisterHeader({
  currentStep,
  totalSteps = 4,
}: RegisterHeaderProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {navigation.canGoBack() ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={8}
        >
          <Feather name="chevron-left" size={20} color={colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
    </View>
  );
}
