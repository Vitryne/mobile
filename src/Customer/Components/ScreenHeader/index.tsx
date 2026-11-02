import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "./styles";

const WEB_MIN_TOP_INSET = 24;

type ScreenHeaderProps = {
  title: string;
};

export function ScreenHeader({ title }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const topInset =
    Platform.OS === "web"
      ? Math.max(insets.top, WEB_MIN_TOP_INSET)
      : insets.top;

  return (
    <View style={[styles.container, { paddingTop: topInset + 4 }]}>
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
}
