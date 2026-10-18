export type ProductHeaderProps = {
  isFavorite: boolean;
  cartCount: number;
  onBack: () => void;
  onToggleFavorite: () => void;
  onGoToStore: () => void;
  onGoToCart: () => void;
};