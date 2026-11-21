import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type ListRenderItemInfo,
} from "react-native";

import { BottomNavBar } from "../../../../../Customer/Components/BottomNavBar";
import CatalogSearch from "../../../../../Customer/Components/CatalogSearch";
import { SearchBar } from "../../../../../Customer/Components/SearchBar";
import {
  filterCatalogProducts,
  getCategoryProductCount,
} from "../../../../../Customer/Data/catalog";
import { useRevealOnScrollUp } from "../../../../../Customer/Hooks/useRevealOnScrollUp";
import { colors } from "../../../../../Shared/Styles/commonStyles";

import { ScreenHeader } from "../../../../Components/ScreenHeader";
import { useProducts } from "../../../../Hooks/useProducts";
import type { CustomerStackParamList } from "../../../../Types/navigation";
import { ProductCard } from "../../../Home/Components/ProductCard";
import { CategoryCard } from "../../Components/CategoryCard";

import {
  CATEGORIES,
  FILTERS,
  TREND_BANNER,
  type CategoryFilter,
} from "../../Data/data";

import { GRID_GAP, SCREEN_PADDING, styles } from "./styles";

type CategoryNavigation = NativeStackNavigationProp<CustomerStackParamList>;

type FilterChipProps = {
  item: CategoryFilter;
  selected: boolean;
  onPress: (id: CategoryFilter["id"]) => void;
};

function FilterChip({ item, selected, onPress }: FilterChipProps) {
  return (
    <Pressable
      style={[styles.chip, selected && styles.chip_selected]}
      onPress={() => onPress(item.id)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text style={[styles.chip_text, selected && styles.chip_text_selected]}>
        {item.label}
      </Text>
    </Pressable>
  );
}

const extraStyles = StyleSheet.create({
  search_touch_area: {
    position: "relative",
  },

  search_touch_overlay: {
    ...StyleSheet.absoluteFill,
  },

  feedback_container: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 20,
    alignItems: "center",
    gap: 8,
  },

  feedback_title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },

  feedback_description: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: "center",
  },

  result_header: {
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: SCREEN_PADDING,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  result_title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },

  result_count: {
    fontSize: 11,
    color: colors.textMuted,
  },

  product_grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: GRID_GAP,
    rowGap: 16,
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 24,
  },
});

export function Category() {
  const navigation = useNavigation<CategoryNavigation>();

  const { width } = useWindowDimensions();

  const { products, isLoading, errorMessage } = useProducts();

  const [searchVisible, setSearchVisible] = useState(false);

  const [selectedFilterId, setSelectedFilterId] = useState<
    CategoryFilter["id"]
  >(FILTERS[0].id);

  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const { onScroll, translateY } = useRevealOnScrollUp();

  const contentWidth = width - SCREEN_PADDING * 2;

  const cardWidth = (contentWidth - GRID_GAP) / 2;

  const filteredProducts = useMemo(
    () => filterCatalogProducts(products, selectedFilterId),
    [products, selectedFilterId],
  );

  const visibleCategories = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        ...category,
        count: getCategoryProductCount(products, category.id, selectedFilterId),
      })).filter((category) => category.count > 0),
    [products, selectedFilterId],
  );

  function handleOpenSearch() {
    setSearchVisible(true);
  }

  function handleCloseSearch() {
    setSearchVisible(false);
  }

  function handleOpenProduct(productId: number) {
    setSearchVisible(false);

    navigation.navigate("Product", {
      productId,
    });
  }

  function handleToggleFavorite(id: number) {
    setFavorites((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));
  }

  const renderFilter = ({ item }: ListRenderItemInfo<CategoryFilter>) => (
    <FilterChip
      item={item}
      selected={item.id === selectedFilterId}
      onPress={setSelectedFilterId}
    />
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Categorias" />

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
            data={FILTERS}
            keyExtractor={(item) => item.id}
            renderItem={renderFilter}
            extraData={selectedFilterId}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chip_list}
            contentContainerStyle={styles.chip_list_content}
          />

          {isLoading ? (
            <View style={extraStyles.feedback_container}>
              <Text style={extraStyles.feedback_title}>
                Carregando produtos...
              </Text>
            </View>
          ) : errorMessage ? (
            <View style={extraStyles.feedback_container}>
              <Text style={extraStyles.feedback_title}>
                Não foi possível carregar os produtos.
              </Text>

              <Text style={extraStyles.feedback_description}>
                {errorMessage}
              </Text>
            </View>
          ) : filteredProducts.length === 0 ? (
            <View style={extraStyles.feedback_container}>
              <Text style={extraStyles.feedback_title}>
                Nenhuma peça encontrada
              </Text>

              <Text style={extraStyles.feedback_description}>
                Não há produtos disponíveis para esse filtro.
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.grid}>
                {visibleCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    name={category.name}
                    count={category.count}
                    image={category.image}
                    style={{
                      width: cardWidth,
                    }}
                  />
                ))}
              </View>

              <View style={extraStyles.result_header}>
                <Text style={extraStyles.result_title}>Peças disponíveis</Text>

                <Text style={extraStyles.result_count}>
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "produto" : "produtos"}
                </Text>
              </View>

              <View style={extraStyles.product_grid}>
                {filteredProducts.map((product) => (
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
                        ? {
                            uri: product.photoUrls[0],
                          }
                        : undefined
                    }
                    favorite={!!favorites[product.id]}
                    onToggleFavorite={() => handleToggleFavorite(product.id)}
                    onPress={() => handleOpenProduct(product.id)}
                    style={{
                      width: cardWidth,
                    }}
                  />
                ))}
              </View>
            </>
          )}

          <View style={styles.trend_banner}>
            <View style={styles.trend_texts}>
              <Text style={styles.trend_title}>{TREND_BANNER.title}</Text>

              <Text style={styles.trend_subtitle}>{TREND_BANNER.subtitle}</Text>
            </View>

            <Pressable
              style={styles.trend_button}
              accessibilityRole="button"
              onPress={handleOpenSearch}
            >
              <Text style={styles.trend_button_text}>{TREND_BANNER.cta}</Text>
            </Pressable>
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
          <View style={extraStyles.search_touch_area}>
            <SearchBar
              value=""
              onChangeText={handleOpenSearch}
              onPressFilter={handleOpenSearch}
            />

            <Pressable
              style={extraStyles.search_touch_overlay}
              onPress={handleOpenSearch}
              accessibilityRole="button"
              accessibilityLabel="Abrir pesquisa"
            />
          </View>
        </Animated.View>
      </View>

      <BottomNavBar />

      <CatalogSearch
        visible={searchVisible}
        products={products}
        onClose={handleCloseSearch}
        onOpenProduct={handleOpenProduct}
      />
    </View>
  );
}
