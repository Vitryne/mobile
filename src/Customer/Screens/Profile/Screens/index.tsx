import { useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";

import { BottomNavBar } from "../../../Components/BottomNavBar";

import ProfileFeedback from "../Components/ProfileFeedback";
import ProfileHeader from "../Components/ProfileHeader";
import ProfileMenu from "../Components/ProfileMenu";
import ProfileShortcuts from "../Components/ProfileShortcuts";

import {
    PROFILE_VERSION,
    type ProfileMenuOption,
    type ProfileShortcut,
} from "../Data/data";

import { styles } from "./styles";

export function Profile() {
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleEditProfile() {
    setFeedback("A edição do perfil será implementada posteriormente.");
  }

  function handleShortcutPress(shortcut: ProfileShortcut) {
    setFeedback(`${shortcut.label}: funcionalidade em demonstração.`);
  }

  function handleMenuPress(option: ProfileMenuOption) {
    if (option.id === "logout") {
      setFeedback("A saída da conta será implementada posteriormente.");
      return;
    }

    setFeedback(`${option.title}: funcionalidade em demonstração.`);
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#801DB7" />

      <ProfileHeader onEditProfile={handleEditProfile} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scroll_content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileShortcuts onShortcutPress={handleShortcutPress} />

        <ProfileMenu onOptionPress={handleMenuPress} />

        <Text style={styles.version_text}>{PROFILE_VERSION}</Text>

        {feedback !== null && (
          <ProfileFeedback
            message={feedback}
            onClose={() => setFeedback(null)}
          />
        )}
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}
