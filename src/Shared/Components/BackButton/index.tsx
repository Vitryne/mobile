import { IconButton } from "@/Shared/Components/IconButton";
import { colors } from "@/Shared/Styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BACK_ICON_SIZE } from "./styles";

type BackButtonProps = {
  onPress?: () => void;
  accessibilityLabel?: string;
};

export function BackButton({
  onPress,
  accessibilityLabel = "Voltar",
}: BackButtonProps) {
  const navigation = useNavigation();

  function handlePress() {
    if (onPress) {
      onPress();
      return;
    }

    if (navigation.canGoBack()) navigation.goBack();
  }

  return (
    <IconButton
      icon={
        <Ionicons name="arrow-back" size={BACK_ICON_SIZE} color={colors.text} />
      }
      onPress={handlePress}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
