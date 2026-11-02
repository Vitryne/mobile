import { commonStyles } from "@/Shared/Styles/commonStyles";
import { ScrollView, View } from "react-native";
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
    selectedImage,
    setSelectedImage,
    selectedSize,
    setSelectedSize,
    isFavorite,
    cartCount,
    handleBack,
    handleToggleFavorite,
    handleGoToStore,
    handleGoToCart,
    handleOpenSizeTable,
    handleOpenDelivery,
    handleAddToCart,
  } = useProduct();

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
            lowStockMessage={product.lowStockMessage}
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
        price={product.price}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />
    </View>
  );
}
