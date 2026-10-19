import type { ImageSourcePropType } from "react-native";

export type ProductHeaderProps = {
  isFavorite: boolean;
  cartCount: number;
  onBack: () => void;
  onToggleFavorite: () => void;
  onGoToStore: () => void;
  onGoToCart: () => void;
};

export type ProductGalleryProps = {
  images: ImageSourcePropType[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};