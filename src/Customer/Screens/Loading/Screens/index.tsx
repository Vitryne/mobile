import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import Logo from "../../../../../assets/Images/logo.svg";
import { colors } from "../../../../Shared/Styles/commonStyles";
import { useSessionRestore } from "../../../Hooks/useSessionRestore";
import { CustomerStackParamList } from "../../../Types/navigation";
import { styles } from "./style";

type Props = NativeStackScreenProps<CustomerStackParamList, "Loading">;

export function Loading({ navigation }: Props) {
  useSessionRestore(navigation);

  return (
    <ImageBackground
      source={require("../../../../../assets/Images/splash.jpg")}
      style={styles.splash_image}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Logo width={261} height={46} opacity={1} color={colors.white} />

        <Text style={styles.splash_subtitle}>MODA . ENTREGA . PREMIUM</Text>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    </ImageBackground>
  );
}
