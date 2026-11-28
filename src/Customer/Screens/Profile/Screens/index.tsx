import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";

import { useCustomerSession } from "../../../Context/customerSessionContext";
import type {
  CustomerStackParamList,
  CustomerTabParamList,
} from "../../../Types/navigation";

import ProfileEditModal from "../Components/ProfileEditModal";
import ProfileFeedback from "../Components/ProfileFeedback";
import ProfileHeader from "../Components/ProfileHeader";
import ProfileLogoutModal from "../Components/ProfileLogoutModal";
import ProfileMenu from "../Components/ProfileMenu";
import ProfileShortcuts from "../Components/ProfileShortcuts";

import {
  PROFILE_VERSION,
  type ProfileMenuOption,
  type ProfileShortcut,
} from "../Data/data";

import { styles } from "./styles";

type Navigation = BottomTabNavigationProp<CustomerTabParamList, "Profile">;

type StackNavigation = NativeStackNavigationProp<CustomerStackParamList>;

const AVATAR_COLORS = ["#EEDAFF", "#D6E8FF", "#FCE7F3", "#D1FAE5"];

function getInitials(fullName: string) {
  const names = fullName.trim().split(/\s+/).filter(Boolean);

  if (names.length === 0) {
    return "?";
  }

  if (names.length === 1) {
    return names[0].slice(0, 2).toUpperCase();
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}

export function Profile() {
  const navigation = useNavigation<Navigation>();

  const { currentUser, logoutCustomer } = useCustomerSession();

  const [feedback, setFeedback] = useState<string | null>(null);

  const [editVisible, setEditVisible] = useState(false);

  const [logoutVisible, setLogoutVisible] = useState(false);

  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0]);

  const [draftAvatarColor, setDraftAvatarColor] = useState(AVATAR_COLORS[0]);

  const fullName = currentUser?.fullName ?? "Visitante";
  const email = currentUser?.email ?? "Não autenticado";
  const initials = getInitials(fullName);

  function handleEditProfile() {
    setFeedback(null);
    setDraftAvatarColor(avatarColor);
    setEditVisible(true);
  }

  function handleChangePhoto() {
    const currentIndex = AVATAR_COLORS.indexOf(draftAvatarColor);

    const nextIndex = (currentIndex + 1) % AVATAR_COLORS.length;

    setDraftAvatarColor(AVATAR_COLORS[nextIndex]);
  }

  function handleCancelEdit() {
    setDraftAvatarColor(avatarColor);
    setEditVisible(false);
  }

  function handleSaveProfile() {
    setAvatarColor(draftAvatarColor);
    setEditVisible(false);
  }

  function handleOpenAddresses() {
    setFeedback(null);
    navigation.getParent<StackNavigation>()?.navigate("AddressList");
  }

  function handleOpenPaymentMethods() {
    setFeedback(null);
    navigation.getParent<StackNavigation>()?.navigate("PaymentMethods");
  }

  function handleShortcutPress(shortcut: ProfileShortcut) {
    if (shortcut.id === "addresses") {
      handleOpenAddresses();
      return;
    }

    if (shortcut.id === "payment") {
      handleOpenPaymentMethods();
      return;
    }

    setFeedback(`${shortcut.label}: funcionalidade em demonstração.`);
  }

  function handleMenuPress(option: ProfileMenuOption) {
    if (option.id === "addresses") {
      handleOpenAddresses();
      return;
    }

    if (option.id === "logout") {
      setFeedback(null);
      setLogoutVisible(true);
      return;
    }

    setFeedback(`${option.title}: funcionalidade em demonstração.`);
  }

  function handleCancelLogout() {
    setLogoutVisible(false);
  }

  async function handleConfirmLogout() {
    setLogoutVisible(false);
    await logoutCustomer();

    navigation.getParent<StackNavigation>()?.reset({
      index: 0,
      routes: [
        {
          name: "Loading",
        },
      ],
    });
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#801DB7" />

      <ProfileHeader
        fullName={fullName}
        email={email}
        initials={initials}
        avatarColor={avatarColor}
        onEditProfile={handleEditProfile}
      />

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

      <ProfileEditModal
        visible={editVisible}
        initials={initials}
        avatarColor={draftAvatarColor}
        onChangePhoto={handleChangePhoto}
        onCancel={handleCancelEdit}
        onSave={handleSaveProfile}
      />

      <ProfileLogoutModal
        visible={logoutVisible}
        onCancel={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </View>
  );
}
