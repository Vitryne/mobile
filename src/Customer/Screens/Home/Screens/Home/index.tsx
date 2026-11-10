import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  type ListRenderItemInfo,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";

import { BottomNavBar } from "../../../../../Customer/Components/BottomNavBar";
import { SearchBar } from "../../../../../Customer/Components/SearchBar";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { useProducts } from "../../../../Hooks/useProducts";
import { useRevealOnScrollUp } from "../../../../Hooks/useRevealOnScrollUp";
import type { CustomerStackParamList } from "../../../../Types/navigation";

import { HomeHeader } from "../../Components/Header";
import { ProductCard } from "../../Components/ProductCard";

import {
  BANNERS,
  CATEGORIES,
  DELIVERY_ADDRESS,
  OPEN_ORDERS_COUNT,
  STORES,
  type HomeBanner,
  type HomeCategory,
  type HomeStore,
} from "../../Data/data";

import { PRODUCT_GAP, SCREEN_PADDING, styles } from "./styles";

const STAR_COLOR = "#F5A623";

type HomeNavigation = NativeStackNavigationProp<CustomerStackParamList>;

type SectionHeaderProps = {
  title: string;
  inlineLink?: boolean;
  onPressLink?: () => void;
};

function SectionHeader({
  title,
  inlineLink = false,
  onPressLink,
}: SectionHeaderProps) {
  return (
    <View
      style={[
        styles.section_header,
        inlineLink
          ? styles.section_header_inline
          : styles.section_header_spread,
      ]}
    >
      <Text style={styles.section_title}>{title}</Text>

      <Pressable onPress={onPressLink} hitSlop={8} accessibilityRole="link">
        <Text style={styles.section_link}>Ver mais</Text>
      </Pressable>
    </View>
  );
}

type CategoryItemProps = {
  item: HomeCategory;
  selected: boolean;
  onPress: (item: HomeCategory) => void;
};

function CategoryItem({ item, selected, onPress }: CategoryItemProps) {
  return (
    <Pressable
      style={styles.category_item}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View
        style={[
          styles.category_ring,
          selected && styles.category_ring_selected,
        ]}
      >
        <Image
          source={item.image}
          style={styles.category_image}
          resizeMode="cover"
        />
      </View>

      <Text
        style={[
          styles.category_label,
          selected && styles.category_label_selected,
        ]}
        numberOfLines={1}
      >
        {item.label}
      </Text>
    </Pressable>
  );
}

type PromoBannerProps = {
  item: HomeBanner;
  width: number;
  total: number;
  activeIndex: number;
};

function PromoBanner({ item, width, total, activeIndex }: PromoBannerProps) {
  return (
    <ImageBackground
      source={item.image}
      style={[styles.banner_card, { width }]}
      imageStyle={styles.banner_image}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.62)", "rgba(0,0,0,0.25)", "rgba(0,0,0,0)"]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.banner_gradient}
      >
        <View style={styles.banner_tag}>
          <Text style={styles.banner_tag_text}>{item.tag}</Text>
        </View>

        <Text style={styles.banner_title}>{item.title}</Text>

        <View style={styles.banner_footer}>
          <View style={styles.banner_footer_side}>
            <Pressable style={styles.banner_button} accessibilityRole="button">
              <Text style={styles.banner_button_text}>{item.cta}</Text>

              <Feather name="arrow-right" size={14} color={colors.white} />
            </Pressable>
          </View>

          <View style={styles.banner_dots}>
            {Array.from({ length: total }, (_, index) => (
              <View
                key={index}
                style={[
                  styles.banner_dot,
                  index === activeIndex && styles.banner_dot_active,
                ]}
              />
            ))}
          </View>

          <View style={styles.banner_footer_side} />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

function StoreCard({ item }: { item: HomeStore }) {
  return (
    <Pressable
      style={styles.store_card}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      <ImageBackground
        source={item.image}
        style={styles.store_image}
        imageStyle={styles.store_image_radius}
        resizeMode="cover"
      >
        {item.tag ? (
          <View style={styles.store_tag}>
            <Text style={styles.store_tag_text}>{item.tag}</Text>
          </View>
        ) : null}
      </ImageBackground>

      <Text style={styles.store_name} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={styles.store_meta}>
        <Ionicons name="star" size={11} color={STAR_COLOR} />

        <Text style={styles.store_meta_text}>
          {item.distance} · {item.rating}
        </Text>

        <View style={styles.store_meta_dot} />
      </View>
    </Pressable>
  );
}

export function Home() {
  const navigation = useNavigation<HomeNavigation>();
  const { width: windowWidth } = useWindowDimensions();

  const {
    products,
    isLoading: isLoadingProducts,
    errorMessage: productsError,
    reload: reloadProducts,
  } = useProducts();

  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    CATEGORIES[0].id,
  );
  const [bannerIndex, setBannerIndex] = useState(0);

  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const contentWidth = windowWidth - SCREEN_PADDING * 2;

  const productWidth = (contentWidth - PRODUCT_GAP) / 2;

  const { onScroll, translateY } = useRevealOnScrollUp();

  function handleOpenFilters() {}

  function handleToggleFavorite(id: number) {
    setFavorites((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  }

  function handleSelectCategory(category: HomeCategory) {
    setSelectedCategoryId(category.id);

    navigation.navigate("Category", {
      categoryId: category.id,
      categoryName: category.label,
    });
  }

  function handleOpenProduct(productId: number) {
    navigation.navigate("Product", { productId });
  }

  const handleBannerScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(
        event.nativeEvent.contentOffset.x / contentWidth,
      );

      setBannerIndex((previous) => (previous === index ? previous : index));
    },
    [contentWidth],
  );

  const renderCategory = ({ item }: ListRenderItemInfo<HomeCategory>) => (
    <CategoryItem
      item={item}
      selected={item.id === selectedCategoryId}
      onPress={handleSelectCategory}
    />
  );

  const renderBanner = ({ item }: ListRenderItemInfo<HomeBanner>) => (
    <PromoBanner
      item={item}
      width={contentWidth}
      total={BANNERS.length}
      activeIndex={bannerIndex}
    />
  );

  const renderStore = ({ item }: ListRenderItemInfo<HomeStore>) => (
    <StoreCard item={item} />
  );

  return (
    <View style={styles.container}>
      <HomeHeader address={DELIVERY_ADDRESS} cartCount={OPEN_ORDERS_COUNT} />

      <View style={styles.body}>
        <Animated.ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_content}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={onScroll}
          keyboardShouldPersistTaps="handled"
        >
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={renderCategory}
            extraData={selectedCategoryId}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontal_list}
            contentContainerStyle={styles.category_list_content}
          />

          <View style={styles.banner_section}>
            <FlatList
              data={BANNERS}
              keyExtractor={(item) => item.id}
              renderItem={renderBanner}
              extraData={bannerIndex}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={handleBannerScroll}
              style={styles.horizontal_list}
            />
          </View>

          <SectionHeader title="Lojas perto de você" inlineLink />

          <FlatList
            data={STORES}
            keyExtractor={(item) => item.id}
            renderItem={renderStore}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontal_list}
            contentContainerStyle={styles.store_list_content}
          />

          <SectionHeader title="Recomendados para você" />

          {isLoadingProducts ? (
            <View style={styles.products_feedback}>
              <Text style={styles.products_message}>
                Carregando produtos...
              </Text>
            </View>
          ) : null}

          {productsError ? (
            <View style={styles.products_feedback}>
              <Text
                style={[styles.products_message, styles.products_message_error]}
              >
                {productsError}
              </Text>

              <Pressable
                onPress={reloadProducts}
                hitSlop={8}
                accessibilityRole="button"
              >
                <Text style={styles.section_link}>Tentar novamente</Text>
              </Pressable>
            </View>
          ) : null}

          {!isLoadingProducts && !productsError && products.length === 0 ? (
            <View style={styles.products_feedback}>
              <Text style={styles.products_message}>
                Nenhum produto disponível no momento.
              </Text>
            </View>
          ) : null}

          <View style={styles.product_grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                store={product.type}
                price={product.finalPrice}
                oldPrice={product.onSale ? product.price : undefined}
                discount={
                  product.discountPercent > 0
                    ? product.discountPercent
                    : undefined
                }
                image={
                  product.photoUrls[0]
                    ? { uri: product.photoUrls[0] }
                    : undefined
                }
                favorite={!!favorites[product.id]}
                onToggleFavorite={() => handleToggleFavorite(product.id)}
                onPress={() => handleOpenProduct(product.id)}
                style={{ width: productWidth }}
              />
            ))}
          </View>
        </Animated.ScrollView>

        <Animated.View
          style={[
            styles.search_area,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onPressFilter={handleOpenFilters}
          />
        </Animated.View>
      </View>

      <BottomNavBar />
    </View>
  );
}
