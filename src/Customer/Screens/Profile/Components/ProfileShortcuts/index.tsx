import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { colors } from "../../../../../Shared/Styles/commonStyles";
import { PROFILE_SHORTCUTS, type ProfileShortcut } from "../../Data/data";
import { styles } from "./styles";

type ProfileShortcutsProps = {
  onShortcutPress: (shortcut: ProfileShortcut) => void;
};

export default function ProfileShortcuts({
  onShortcutPress,
}: ProfileShortcutsProps) {
  return (
    <View style={styles.container}>
      {PROFILE_SHORTCUTS.map((shortcut) => (
        <Pressable
          key={shortcut.id}
          style={styles.shortcut_button}
          onPress={() => onShortcutPress(shortcut)}
          accessibilityRole="button"
          accessibilityLabel={shortcut.label}
        >
          <View style={styles.icon_container}>
            <Feather name={shortcut.icon} size={20} color={colors.primary} />
          </View>

          <Text style={styles.shortcut_label} numberOfLines={1}>
            {shortcut.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
