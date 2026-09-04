import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import { commonStyles } from "../../../../Shared/Styles/commonStyles";
import { PrimaryButton } from "../../../Components/PrimaryButton";
import { SecundaryButton } from "../../../Components/SecundaryButton";
import { RootStackParamList } from "../../../Types/navigation";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Starter">;

export function Starter({ navigation }: Props) {
  return (
    <View style={commonStyles.screen}>
      <View style={styles.container}>
        <View style={styles.image_wrapper}>
          <Image
            style={styles.image}
            source={require("../../../../../assets/Images/onboarding.png")}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.75)", "#FFFFFF"]}
            locations={[0, 0.55, 1]}
            style={styles.gradient}
          />
        </View>

        <View style={styles.text_block}>
          <Text style={styles.title}>Lojas locais.</Text>
          <Text style={[styles.title, styles.title_purple]}>
            Estilo entregue.
          </Text>
          <Text style={styles.subtitle}>
            Descubra lojas de moda perto de você, peça pelo app e receba em casa
            — no mesmo dia.
          </Text>

          <View style={styles.dots_container}>
            <View style={[styles.dot, styles.dot_active]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <PrimaryButton
          label="Criar Conta"
          onPress={() => navigation.navigate("MenuCarrinho")}
        />
        <SecundaryButton
          label="Já tenho uma conta"
          onPress={() => navigation.navigate("MenuCarrinho")}
        />
      </View>
    </View>
  );
}
