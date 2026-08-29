import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ActivityIndicator, ImageBackground, View } from "react-native";
import { RootStackParamList } from "../../../Types/navigation";
import { styles } from "./style";

type Props = NativeStackScreenProps<RootStackParamList, "Carregamento">;

export function Carregamento({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Substitua 'Home' pelo nome real da sua próxima tela
      navigation.replace("MenuCarrinho");
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
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </ImageBackground>
  );
}
