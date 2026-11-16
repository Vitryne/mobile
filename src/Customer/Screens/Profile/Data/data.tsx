import type { Feather } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type ProfileIconName = ComponentProps<typeof Feather>["name"];

export type ProfileShortcut = {
  id: string;
  label: string;
  icon: ProfileIconName;
};

export type ProfileMenuOption = {
  id: string;
  title: string;
  description: string;
  icon: ProfileIconName;
  destructive?: boolean;
};

export const MOCK_USER = {
  name: "Marina da Silva",
  email: "marina@vitryne.com",
  initials: "MS",
};

export const PROFILE_SHORTCUTS: ProfileShortcut[] = [
  {
    id: "favorites",
    label: "Favoritos",
    icon: "heart",
  },
  {
    id: "addresses",
    label: "Endereços",
    icon: "map-pin",
  },
  {
    id: "payment",
    label: "Pagamento",
    icon: "credit-card",
  },
  {
    id: "coupons",
    label: "Cupons",
    icon: "tag",
  },
];

export const PROFILE_MENU: ProfileMenuOption[] = [
  {
    id: "settings",
    title: "Configurações",
    description: "Notificações, tema, idioma",
    icon: "settings",
  },
  {
    id: "help",
    title: "Central de ajuda",
    description: "FAQ e atendimento",
    icon: "help-circle",
  },
  {
    id: "privacy",
    title: "Privacidade & LGPD",
    description: "Dados, cookies e exclusão",
    icon: "box",
  },
  {
    id: "logout",
    title: "Sair da conta",
    description: "Encerra a sessão neste dispositivo",
    icon: "log-out",
    destructive: true,
  },
];

export const PROFILE_VERSION = "Vitryne v2.4.0 · build 2026.05.15";
