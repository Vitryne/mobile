import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { View } from "react-native";
import { commonStyles } from "../../../../Shared/Styles/commonStyles";
import { PrimaryButton } from "../../../Components/PrimaryButton";
import { RootStackParamList } from "../../../Types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Starter">;

export function Starter({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("MenuCarrinho");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View styles={commonStyles.screen}>
      <PrimaryButton
        title="Ir para o carrinho"
        onPress={() => navigation.replace("MenuCarrinho")}
      />
    </View>
  );
}
