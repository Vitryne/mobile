import CardPreview from "@/Customer/Components/CardPreview";
import type { SavedCard } from "@/Customer/Types/savedCard";
import { colors } from "@/Shared/Styles/commonStyles";
import { Feather } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { styles } from "./styles";

type Props = {
  card: SavedCard;
  onPress: (card: SavedCard) => void;
  onRemove: (card: SavedCard) => void;
};

export default function SavedCardItem({ card, onPress, onRemove }: Props) {
  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => onPress(card)}
        accessibilityRole="button"
        accessibilityLabel={`Cartão final ${card.lastFour}`}
        accessibilityHint={
          card.isMain ? undefined : "Define este cartão como principal"
        }
        accessibilityState={{ selected: card.isMain }}
      >
        <CardPreview
          preview={{
            brand: card.brand,
            maskedNumber: card.lastFour,
            holderName: card.holderName,
            expiry: card.expiry,
          }}
          tone={card.isMain ? "primary" : "dark"}
          badge={card.isMain ? "PRINCIPAL" : undefined}
        />
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.remove_button,
          pressed && styles.remove_button_pressed,
        ]}
        onPress={() => onRemove(card)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={`Remover cartão final ${card.lastFour}`}
      >
        <Feather name="trash-2" size={16} color={colors.white} />
      </Pressable>
    </View>
  );
}
