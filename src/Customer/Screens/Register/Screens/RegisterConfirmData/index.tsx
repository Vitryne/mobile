import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { PrimaryButton } from "../../../../Components/PrimaryButton";
import { CustomerStackParamList } from "../../../../Types/navigation";
import { RegisterHeader } from "../../Components/RegisterHeader";
import { styles } from "./styles";

export function RegisterConfirmData() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();

  const route =
    useRoute<RouteProp<CustomerStackParamList, "RegisterConfirmData">>();

  const {
    fullName,
    cpf,
    email,
    cep,
    city,
    state,
    street,
    number,
    neighborhood,
    complement,
  } = route.params;

  const formattedAddress = `${street}, ${number}${
    complement ? ` - ${complement}` : ""
  }`;

  function handleFinish() {
    navigation.navigate("MenuCarrinho");
  }

  return (
    <View style={styles.container}>
      <RegisterHeader currentStep={4} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Quase lá, confira tudo.</Text>
        <Text style={styles.subtitle}>Passo 4 de 4 · Confirmar</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Dados pessoais</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("RegisterPersonalData", {
                  editMode: true,
                  fullName,
                  cpf,
                  email,
                  address: {
                    cep,
                    city,
                    state,
                    street,
                    number,
                    neighborhood,
                    complement,
                  },
                })
              }
            >
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{fullName}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>CPF</Text>
            <Text style={styles.value}>{cpf}</Text>
          </View>

          <View style={[styles.dataRow, styles.lastRow]}>
            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Endereço de entrega</Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("RegisterAddresData", {
                  fullName,
                  cpf,
                  email,
                  editMode: true,
                  initialAddress: {
                    cep,
                    city,
                    state,
                    street,
                    number,
                    neighborhood,
                    complement,
                  },
                })
              }
            >
              <Text style={styles.editText}>Editar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>CEP</Text>
            <Text style={styles.value}>{cep}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Endereço</Text>
            <Text style={styles.value}>{formattedAddress}</Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.label}>Bairro</Text>
            <Text style={styles.value}>{neighborhood}</Text>
          </View>

          <View style={[styles.dataRow, styles.lastRow]}>
            <Text style={styles.label}>Cidade</Text>
            <Text style={styles.value}>
              {city} - {state}
            </Text>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <View style={styles.checkCircle}>
            <Feather name="check" size={11} color="#FFFFFF" />
          </View>

          <Text style={styles.termsText}>
            Ao continuar, você aceita os <Text style={styles.link}>Termos</Text>{" "}
            e <Text style={styles.link}>Política de Privacidade</Text>.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            label="Finalizar cadastro"
            onPress={handleFinish}
            icon={<Feather name="check" size={18} color="#FFFFFF" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}
