import type { ProductReviewsProps } from "@/Customer/Types/product";
import { colors } from "@/Shared/Styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { styles } from "./styles";

const STARS = [1, 2, 3, 4, 5];

export function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliações</Text>

      {reviews.map((review) => (
        <View key={review.id} style={styles.card}>
          <View style={styles.card_header}>
            <View style={styles.avatar}>
              <Text style={styles.avatar_text}>{review.initials}</Text>
            </View>

            <View style={styles.user_info}>
              <Text style={styles.user}>{review.user}</Text>
              <Text style={styles.time}>{review.time}</Text>
            </View>

            <View style={styles.rating_row}>
              {STARS.map((star) => (
                <Ionicons
                  key={star}
                  name={star <= review.rating ? "star" : "star-outline"}
                  size={12}
                  color={colors.warning}
                />
              ))}
              <Text style={styles.rating_value}>
                {review.rating.toFixed(1).replace(".", ",")}
              </Text>
            </View>
          </View>

          <Text style={styles.text}>{review.text}</Text>

          {review.storeReply && (
            <View style={styles.reply}>
              <Text style={styles.reply_label}>RESPOSTA DA LOJA</Text>
              <Text style={styles.reply_text}>{review.storeReply}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
