import React from 'react';
import { Text, View } from 'react-native';

import { CardBrand, PaymentCardPreview } from '../../../../Types/paymentCard';
import { styles } from './styles';

type CardPreviewProps = {
  preview: PaymentCardPreview;
};

const brandLabels: Record<CardBrand, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  other: 'Cartão',
};

const hiddenGroups = [0, 1, 2];
const dotsPerGroup = [0, 1, 2, 3];

const CardPreview = ({ preview }: CardPreviewProps) => {
  const brandLabel = brandLabels[preview.brand];
  const lastDigits = preview.maskedNumber.slice(-4);

  return (
    <View style={styles.card}>
      <View style={styles.decoration_circle} />

      <View style={styles.brand_badge}>
        <View style={styles.chip} />
        <Text style={styles.brand_badge_text}>{brandLabel.toUpperCase()}</Text>
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