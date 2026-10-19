import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { useProduct } from "../../../Hooks/useProduct";
import { ProductGallery } from "../Components/ProductGallery";
import { ProductHeader } from "../Components/ProductHeader";
import { styles } from "./styles";

export function Product() {
  const {
    images,
    selectedImage,
    setSelectedImage,
    isFavorite,
    cartCount,
    handleBack,
    handleToggleFavorite,
    handleGoToStore,
    handleGoToCart,
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
          <View style={[styles.box, styles.store]}>
            <Text style={styles.box_name}>LOJA</Text>
          </View>

          <View style={[styles.box, styles.title_price]}>
            <Text style={styles.box_name}>TÍTULO E PREÇO</Text>
          </View>

          <View style={[styles.box, styles.sizes]}>
            <Text style={styles.box_name}>TAMANHO</Text>
          </View>

          <View style={[styles.box, styles.delivery]}>
            <Text style={styles.box_name}>ENTREGA</Text>
          </View>

          <View style={[styles.box, styles.description]}>
            <Text style={styles.box_name}>DESCRIÇÃO</Text>
          </View>

          <View style={[styles.box, styles.review]}>
            <Text style={styles.box_name}>AVALIAÇÃO 1</Text>
          </View>
          <View style={[styles.box, styles.review]}>
            <Text style={styles.box_name}>AVALIAÇÃO 2</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={[styles.box, styles.footer_favorite]}>
          <Ionicons name="heart-outline" size={24} color={colors.primary} />
        </View>

        <View style={[styles.box, styles.footer_add]}>
          <Text style={styles.box_name}>ADICIONAR</Text>
        </View>
      </View>
    </View>
  );
}