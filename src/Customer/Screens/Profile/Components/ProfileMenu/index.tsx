import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { colors } from "../../../../../Shared/Styles/commonStyles";
import { PROFILE_MENU, type ProfileMenuOption } from "../../Data/data";
import { styles } from "./styles";

type ProfileMenuProps = {
  onOptionPress: (option: ProfileMenuOption) => void;
};

export default function ProfileMenu({ onOptionPress }: ProfileMenuProps) {
  return (
    <View style={styles.container}>
      {PROFILE_MENU.map((option, index) => (
        <Pressable
          key={option.id}
          style={[
            styles.menu_row,
            index < PROFILE_MENU.length - 1 && styles.menu_row_border,
          ]}
          onPress={() => onOptionPress(option)}
          accessibilityRole="button"
          accessibilityLabel={option.title}
        >
          <View
            style={[
              styles.icon_container,
              option.destructive && styles.icon_container_danger,
            ]}
          >
            <Feather
              name={option.icon}
              size={18}
              color={option.destructive ? colors.danger : colors.textMuted}
            />
          </View>

          <View style={styles.text_container}>
            <Text
              style={[
                styles.option_title,
                option.destructive && styles.option_title_danger,
              ]}
            >
              {option.title}
            </Text>

            <Text style={styles.option_description} numberOfLines={1}>
              {option.description}
            </Text>
          </View>

          <Feather name="chevron-right" size={20} color={colors.textMuted} />
        </Pressable>
      ))}
    </View>
  );
}
