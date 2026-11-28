import { useSavedCards } from "@/Customer/Hooks/useSavedCards";
import type { CustomerStackParamList } from "@/Customer/Types/navigation";
import type { SavedCard } from "@/Customer/Types/savedCard";
import { ScreenHeader } from "@/Shared/Components/ScreenHeader";
import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import { Feather } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PixIcon from "../../../../assets/Images/pix.svg";
import SavedCardItem from "./Components/SavedCardItem";
import { styles } from "./styles";

type Props = NativeStackScreenProps<CustomerStackParamList, "PaymentMethods">;

export function PaymentMethods({ navigation }: Props) {
  const { cards, loading, error, setMain, remove } = useSavedCards();

  function handleAddCard() {
    navigation.navigate("PaymentCard");
  }

  function handleSelectCard(card: SavedCard) {
    if (!card.isMain) setMain(card.id);
  }

  function handleRemoveCard(card: SavedCard) {
    Alert.alert(
      "Remover cartão?",
      `O cartão final ${card.lastFour} será removido deste aparelho.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => remove(card.id),
        },
      ],
    );
  }

  function renderCards() {
    if (loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      );
    }

    if (cards.length === 0) {
      return (
        <Text style={styles.empty_text}>Você ainda não tem cartões salvos</Text>
      );
    }

    return (
      <View style={styles.card_list}>
        {cards.map((card) => (
          <SavedCardItem
            key={card.id}
            card={card}
            onPress={handleSelectCard}
            onRemove={handleRemoveCard}
          />
        ))}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <ScreenHeader title="Pagamento" subtitle="Seus cartões salvos" />

      <ScrollView
        contentContainerStyle={styles.scroll_content}
        showsVerticalScrollIndicator={false}
      >
        {error ? <Text style={styles.error_text}>{error}</Text> : null}

        {renderCards()}

        <Pressable
          style={({ pressed }) => [
            styles.add_button,
            pressed && styles.add_button_pressed,
          ]}
          onPress={handleAddCard}
          accessibilityRole="button"
        >
          <Feather name="plus" size={18} color={colors.primary} />
          <Text style={styles.add_button_text}>Adicionar novo cartão</Text>
        </Pressable>

        <View>
          <Text style={commonStyles.section_label}>OUTRAS FORMAS</Text>

          <View style={styles.method_row}>
            <View style={styles.method_icon}>
              <PixIcon
                width={20}
                height={20}
                color={colors.primary}
                fill={colors.primary}
              />
            </View>

            <View style={styles.method_info}>
              <Text style={styles.method_title}>PIX</Text>
              <Text style={styles.method_description}>Aprovação imediata</Text>
            </View>

            <Feather name="chevron-right" size={18} color={colors.textMuted} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
