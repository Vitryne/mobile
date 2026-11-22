import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import type { CheckoutIssuesProps } from "../../../../Types/payment";
import { styles } from "./styles";

export default function CheckoutIssues({ issues }: CheckoutIssuesProps) {
  if (issues.length === 0) return null;

  const hasBlocking = issues.some((issue) => issue.blocking);

  return (
    <View
      style={[styles.container, hasBlocking && styles.container_blocking]}
      accessibilityRole="alert"
    >
      <Feather
        name="alert-circle"
        size={16}
        color={hasBlocking ? colors.danger : colors.warning}
      />

      <View style={styles.texts}>
        {issues.map((issue, index) => (
          <Text
            key={`${index}-${issue.message}`}
            style={[styles.text, issue.blocking && styles.text_blocking]}
          >
            {issue.message}
          </Text>
        ))}
      </View>
    </View>
  );
}
