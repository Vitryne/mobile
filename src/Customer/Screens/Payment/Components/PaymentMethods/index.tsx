import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";
import PixIcon from "../../../../../../assets/Images/pix.svg";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { PaymentMethodsProps } from "../../../../Types/payment";
import { styles } from "./styles";

function VisaCardIcon() {
  return (
    <View style={styles.cardLayers}>
      <View style={styles.cardLayerBack} />
      <View style={styles.cardLayerMiddle} />
      <LinearGradient
        colors={["#211329", "#32113C", "#3E104D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardLayerFront}
      >
        <View style={styles.cardChip} />
        <Text style={styles.cardVisa}>VISA</Text>
      </LinearGradient>
    </View>
  );
}

function Radio({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioDot} />}
    </View>
  );
}
export default function PaymentMethods({
  selected,
  onSelect,
}: PaymentMethodsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forma de pagamento</Text>
      <ScrollView
        nestedScrollEnabled
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator
      >
        <Pressable
          onPress={() => onSelect("pix")}
          accessibilityRole="radio"
          accessibilityState={{ checked: selected === "pix" }}
          style={[styles.method, selected === "pix" && styles.selected]}
        >
          <View style={styles.pixIcon}>
            <PixIcon
              width={21}
              height={21}
              color={colors.primary}
              fill={colors.primary}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.methodName}>PIX</Text>
            <Text style={styles.description}>
              5% de desconto · aprovação na hora
            </Text>
          </View>
          <Text style={styles.discount}>-5%</Text>
          <Radio selected={selected === "pix"} />
        </Pressable>

        <Pressable
          onPress={() => onSelect("savedCard")}
          accessibilityRole="radio"
          accessibilityState={{ checked: selected === "savedCard" }}
          style={[styles.method, selected === "savedCard" && styles.selected]}
        >
          <VisaCardIcon />
          <View style={styles.details}>
            <Text style={styles.methodName}>Visa •••• 4421</Text>
            <Text style={styles.description}>
              Marina de Silva · até 6x sem juros
            </Text>
          </View>
          <Text style={styles.saved}>SALVO</Text>
          <Radio selected={selected === "savedCard"} />
        </Pressable>

        <Pressable
          onPress={() => onSelect("newCard")}
          accessibilityRole="radio"
          accessibilityState={{ checked: selected === "newCard" }}
          style={[styles.method, selected === "newCard" && styles.selected]}
        >
          <View style={styles.plusIcon}>
            <Feather name="plus" size={18} color={colors.text} />
          </View>
          <View style={styles.details}>
            <Text style={styles.methodName}>Adicionar novo cartão</Text>
            <Text style={styles.description}>Visa, Mastercard, Elo</Text>
          </View>
          <Radio selected={selected === "newCard"} />
        </Pressable>
      </ScrollView>
    </View>
  );
}
