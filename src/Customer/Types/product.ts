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

export type ProductStoreData = {
  name: string;
  initials: string;
  rating: string;
  distance: string;
  deliveryTime: string;
  isOpen: boolean;
};

export type ProductSize = {
  label: string;
  available: boolean;
};

export type ProductReview = {
  id: string;
  initials: string;
  user: string;
  time: string;
  rating: number;
  text: string;
  storeReply?: string;
};

export type ProductData = {
  title: string;
  reference: string;
  price: string;
  priceCents: string;
  oldPrice: string;
  discount: string;
  installments: string;
  description: string;
  lowStockMessage: string;
  deliveryTitle: string;
  deliveryAddress: string;
  deliveryFee: string;
  store: ProductStoreData;
  sizes: ProductSize[];
  reviews: ProductReview[];
};

export type ProductStoreProps = {
  store: ProductStoreData;
};

export type ProductInfoProps = {
  product: Pick<
    ProductData,
    | "title"
    | "reference"
    | "price"
    | "priceCents"
    | "oldPrice"
    | "discount"
    | "installments"
  >;
};

export type ProductSizesProps = {
  sizes: ProductSize[];
  selectedSize: string;
  lowStockMessage: string;
  onSelect: (label: string) => void;
  onOpenSizeTable: () => void;
};

export type ProductDeliveryProps = {
  title: string;
  address: string;
  fee: string;
  onPress: () => void;
};

export type ProductDescriptionProps = {
  description: string;
};

export type ProductReviewsProps = {
  reviews: ProductReview[];
};

export type ProductFooterProps = {
  price: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
};
