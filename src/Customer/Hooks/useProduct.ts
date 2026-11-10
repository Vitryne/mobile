import { fetchProduct } from "@/Customer/Api/product";
import type { CustomerStackParamList } from "@/Customer/Types/navigation";
import type {
  Product,
  ProductData,
  ProductReview,
  ProductStoreData,
} from "@/Customer/Types/product";
import { ApiError } from "@/Shared/Api/apiConfig";
import { formatPrice } from "@/Shared/Utils/formatPrice";
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";

const LOW_STOCK_LIMIT = 3;
const INSTALLMENTS = 6;

// Usadas quando o produto não tem nenhuma foto cadastrada
const FALLBACK_IMAGES: ImageSourcePropType[] = [
  require("../../../assets/Images/detail_1.jpg"),
  require("../../../assets/Images/detail_2.jpg"),
  require("../../../assets/Images/detail_3.jpg"),
];

// Mockado até a API de loja existir
const STORE_MOCK: ProductStoreData = {
  name: "Atelier Norte",
  initials: "AN",
  rating: "4.9",
  distance: "1.2 km",
  deliveryTime: "45-60 min",
  isOpen: true,
};

// Mockado até a API de entrega existir
const DELIVERY_MOCK = {
  deliveryTitle: "Entrega hoje · 45-60 min",
  deliveryAddress: "Av. Brasil, 123 · Higienópolis, SP",
  deliveryFee: "R$ 9,90",
};

// Mockado até a API de avaliações existir
const REVIEWS_MOCK: ProductReview[] = [
  {
    id: "1",
    initials: "JL",
    user: "Julia Lima",
    time: "há 2 semanas",
    rating: 4,
    text: "Qualidade do tecido é excelente. Só achei que o frete poderia ser um pouco mais rápido.",
    storeReply:
      "Obrigada, Julia! Já ajustamos a janela de coleta com os entregadores.",
  },
  {
    id: "2",
    initials: "MC",
    user: "Maria Costa",
    time: "há 3 dias",
    rating: 5,
    text: "Lindo o vestido, igual ao da foto. Caimento e tecido ótimos.",
  },
];

function splitPrice(value: number) {
  const [integer, cents] = value.toFixed(2).split(".");

  return {
    price: `R$ ${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
    priceCents: `,${cents}`,
  };
}

function toProductData(product: Product): ProductData {
  const { price, priceCents } = splitPrice(product.finalPrice);

  return {
    id: product.id,
    title: product.name,
    reference: `${product.type} · Ref. VTR-${String(product.id).padStart(4, "0")}`,
    price,
    priceCents,
    oldPrice: product.onSale ? formatPrice(product.price) : "",
    discount:
      product.discountPercent > 0 ? `-${product.discountPercent}% OFF` : "",
    installments: `em até ${INSTALLMENTS}× ${formatPrice(product.finalPrice / INSTALLMENTS)} sem juros`,
    description: product.description,
    ...DELIVERY_MOCK,
    store: STORE_MOCK,
    sizes: product.sizes,
    reviews: REVIEWS_MOCK,
  };
}

function getProductErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 404) return "Produto não encontrado.";
    if (error.status === 408) {
      return "O servidor demorou para responder. Tente novamente.";
    }
    if (error.status === 0) return "Sem conexão com o servidor.";
  }

  return "Não foi possível carregar o produto.";
}

export function useProduct() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CustomerStackParamList>>();
  const route = useRoute<RouteProp<CustomerStackParamList, "Product">>();
  const { productId } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [chosenSize, setChosenSize] = useState<string | null>(null);

  // Mockado até existir a rota do carrinho
  const [cartCount] = useState(2);

  useEffect(() => {
    let isActive = true;

    async function loadProduct() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchProduct(productId);

        if (isActive) setProduct(data);
      } catch (error) {
        if (isActive) setErrorMessage(getProductErrorMessage(error));
      } finally {
        if (isActive) setIsLoading(false);
      }
    }

    loadProduct();

    return () => {
      isActive = false;
    };
  }, [productId, reloadKey]);

  const firstAvailableSize =
    product?.sizes.find((size) => size.available)?.label ?? "";
  const selectedSize = chosenSize ?? firstAvailableSize;
  const selectedStock = product?.sizes.find(
    (size) => size.label === selectedSize,
  );

  const lowStockMessage =
    selectedStock &&
    selectedStock.quantity > 0 &&
    selectedStock.quantity <= LOW_STOCK_LIMIT
      ? `Apenas ${selectedStock.quantity} ${selectedStock.quantity === 1 ? "restante" : "restantes"} no tamanho ${selectedStock.label}`
      : "";

  const images: ImageSourcePropType[] =
    product && product.photoUrls.length > 0
      ? product.photoUrls.map((uri) => ({ uri }))
      : FALLBACK_IMAGES;

  function handleReload() {
    setReloadKey((previous) => previous + 1);
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleToggleFavorite() {
    setIsFavorite((previous) => !previous);
  }

  function handleGoToStore() {
    console.log("ir para a loja");
  }

  function handleGoToCart() {
    navigation.navigate("Cart");
  }

  function handleOpenSizeTable() {
    console.log("abrir tabela de medidas");
  }

  function handleOpenDelivery() {
    console.log("abrir entrega");
  }

  function handleAddToCart() {
    console.log("adicionar ao carrinho", selectedStock?.id);
  }

  return {
    product: product ? toProductData(product) : null,
    images,
    isLoading,
    errorMessage,
    selectedImage,
    setSelectedImage,
    selectedSize,
    setSelectedSize: setChosenSize,
    lowStockMessage,
    isFavorite,
    cartCount,
    handleReload,
    handleBack,
    handleToggleFavorite,
    handleGoToStore,
    handleGoToCart,
    handleOpenSizeTable,
    handleOpenDelivery,
    handleAddToCart,
  };
}
