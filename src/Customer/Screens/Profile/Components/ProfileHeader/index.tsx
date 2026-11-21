import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

type ProfileHeaderProps = {
  fullName: string;
  email: string;
  initials: string;
  avatarColor: string;
  onEditProfile: () => void;
};

export default function ProfileHeader({
  fullName,
  email,
  initials,
  avatarColor,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <SafeAreaView style={styles.safe_area} edges={["top"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.user_row}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: avatarColor,
              },
            ]}
          >
            <Text style={styles.avatar_text}>{initials}</Text>
          </View>

          <View style={styles.user_info}>
            <Text style={styles.user_name} numberOfLines={1}>
              {fullName}
            </Text>

            <Text style={styles.user_email} numberOfLines={1}>
              {email}
            </Text>

            <Pressable
              style={styles.edit_button}
              onPress={onEditProfile}
              accessibilityRole="button"
            >
              <Text style={styles.edit_button_text}>EDITAR PERFIL</Text>

              <Feather name="edit-2" size={11} color={colors.primary} />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
