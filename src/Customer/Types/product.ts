import type { ImageSourcePropType } from "react-native";

export type AvailableSizeDTO = {
  id?: number;
  size?: string;
  quantity?: number;
  available?: boolean;
};

export type ProductClientResponseDTO = {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  color?: string;
  rating?: number | null;
  price?: number;
  promotionalPrice?: number | null;
  finalPrice?: number;
  status?: string;
  photoUrls?: string[];
  availableSizes?: AvailableSizeDTO[];
  availableProduct?: boolean;
  newProduct?: boolean;
  onSale?: boolean;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  type: string;
  color: string;
  rating: number | null;
  price: number;
  finalPrice: number;
  onSale: boolean;
  discountPercent: number;
  photoUrls: string[];
  sizes: ProductSize[];
  isAvailable: boolean;
  isNew: boolean;
};

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
  id: number;
  label: string;
  quantity: number;
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
  id: number;
  title: string;
  reference: string;
  price: string;
  priceCents: string;
  oldPrice: string;
  discount: string;
  installments: string;
  description: string;
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
