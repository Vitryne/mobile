import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useProduct } from "../../../Hooks/useProduct";
import { ProductDelivery } from "../Components/ProductDelivery";
import { ProductDescription } from "../Components/ProductDescription";
import { ProductFooter } from "../Components/ProductFooter";
import { ProductGallery } from "../Components/ProductGallery";
import { ProductHeader } from "../Components/ProductHeader";
import { ProductInfo } from "../Components/ProductInfo";
import { ProductReviews } from "../Components/ProductReviews";
import { ProductSizes } from "../Components/ProductSizes";
import { ProductStore } from "../Components/ProductStore";
import { styles } from "./styles";

export function Product() {
  const {
    product,
    images,
    isLoading,
    errorMessage,
    selectedImage,
    setSelectedImage,
    selectedSize,
    setSelectedSize,
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
  } = useProduct();

  if (isLoading) {
    return (
      <View style={[commonStyles.screen, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[commonStyles.screen, styles.center]}>
        <Text style={styles.error_text}>
          {errorMessage ?? "Não foi possível carregar o produto."}
        </Text>

        <TouchableOpacity
          style={styles.retry_button}
          activeOpacity={0.8}
          onPress={handleReload}
        >
          <Text style={styles.retry_text}>Tentar novamente</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={handleBack}>
          <Text style={styles.back_text}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={commonStyles.screen}>
      <ProductHeader
        isFavorite={isFavorite}
        cartCount={cartCount}
        onBack={handleBack}
        onToggleFavorite={handleToggleFavorite}
        onGoToStore={handleGoToStore}
        onGoToCart={handleGoToCart}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductGallery
          images={images}
          selectedIndex={selectedImage}
          onSelect={setSelectedImage}
        />

        <View style={styles.sheet}>
          <ProductStore store={product.store} />

          <ProductInfo product={product} />

          <ProductSizes
            sizes={product.sizes}
            selectedSize={selectedSize}
            lowStockMessage={lowStockMessage}
            onSelect={setSelectedSize}
            onOpenSizeTable={handleOpenSizeTable}
          />

          <ProductDelivery
            title={product.deliveryTitle}
            address={product.deliveryAddress}
            fee={product.deliveryFee}
            onPress={handleOpenDelivery}
          />

          <ProductDescription description={product.description} />

          <ProductReviews reviews={product.reviews} />
        </View>
      </ScrollView>

      <ProductFooter
        price={`${product.price}${product.priceCents}`}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
}
