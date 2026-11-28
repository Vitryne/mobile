import React from "react";
import { Text, View } from "react-native";

import type {
  CardBrand,
  PaymentCardPreview,
} from "@/Customer/Types/paymentCard";
import { styles } from "./styles";

type CardPreviewProps = {
  preview: PaymentCardPreview;
  tone?: "primary" | "dark";
  badge?: string;
};

const brandLabels: Record<CardBrand, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  other: "Cartão",
};

const hiddenGroups = [0, 1, 2];
const dotsPerGroup = [0, 1, 2, 3];

const CardPreview = ({
  preview,
  tone = "primary",
  badge,
}: CardPreviewProps) => {
  const brandLabel = brandLabels[preview.brand];
  const lastDigits = preview.maskedNumber.slice(-4);

  return (
    <View style={[styles.card, tone === "dark" && styles.card_dark]}>
      <View style={styles.decoration_circle} />

      <View style={styles.top_row}>
        <View style={styles.brand_badge}>
          <View style={styles.chip} />
          <Text style={styles.brand_badge_text}>
            {brandLabel.toUpperCase()}
          </Text>
        </View>

        {badge ? (
          <View style={styles.status_badge}>
            <Text style={styles.status_badge_text}>{badge}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.number_row}>
        {hiddenGroups.map((group) => (
          <View key={group} style={styles.dots_group}>
            {dotsPerGroup.map((dot) => (
              <View key={dot} style={styles.dot} />
            ))}
          </View>
        ))}
        <Text style={styles.last_digits}>{lastDigits}</Text>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footer_label}>TITULAR</Text>
          <Text style={styles.holder_name}>{preview.holderName}</Text>
        </View>

        <View style={styles.footer_right}>
          <Text style={styles.footer_label}>VALIDADE</Text>
          <Text style={styles.expiry}>
            {preview.expiry} · {brandLabel}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardPreview;
