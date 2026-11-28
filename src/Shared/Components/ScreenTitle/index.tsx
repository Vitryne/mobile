import { useTopInset } from "@/Shared/Hooks/useTopInset";
import { Text, View } from "react-native";
import { styles } from "./styles";

type ScreenTitleProps = {
  title: string;
  subtitle?: string;
  withTopInset?: boolean;
};

export function ScreenTitle({
  title,
  subtitle,
  withTopInset = false,
}: ScreenTitleProps) {
  const topInset = useTopInset();

  return (
    <View style={[styles.container, withTopInset && { paddingTop: topInset }]}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}
