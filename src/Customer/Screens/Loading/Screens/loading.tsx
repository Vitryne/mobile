import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import Logo from "../../../../../assets/Images/logo.svg";
import { colors } from "../../../../Shared/Styles/commonStyles";
import { RootStackParamList } from "../../../Types/navigation";
import { styles } from "./style";

type Props = NativeStackScreenProps<RootStackParamList, "Carregamento">;

export function Carregamento({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Starter");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../../../../../assets/Images/splash.jpg")}
      style={styles.splash_image}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Logo
          width={261}
          height={46}
          top={373}
          left={71}
          opacity={1}
          color={colors.white}
        />

        <Text style={styles.splash_subtitle}>MODA . ENTREGA . PREMIUM</Text>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    </ImageBackground>
  );
}
