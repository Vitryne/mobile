import { BackButton } from "@/Shared/Components/BackButton";
import { useTopInset } from "@/Shared/Hooks/useTopInset";
import type { ReactNode } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

type ScreenHeaderProps = {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  onBack?: () => void;
};

export function ScreenHeader({
  title,
  subtitle,
  right,
  onBack,
}: ScreenHeaderProps) {
  const topInset = useTopInset();

  return (
    <View style={[styles.container, { paddingTop: topInset }]}>
      <BackButton onPress={onBack} />

      <View style={styles.title_block}>
        {title ? (
          <Text
            style={styles.title}
            numberOfLines={1}
            accessibilityRole="header"
          >
            {title}
          </Text>
        ) : null}

        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}
