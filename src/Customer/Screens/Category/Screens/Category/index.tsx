import { Ionicons } from "@expo/vector-icons";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  useNavigation,
  type CompositeNavigationProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  type ListRenderItemInfo,
} from "react-native";

import CatalogSearch from "../../../../../Customer/Components/CatalogSearch";
import { useRevealOnScrollUp } from "../../../../../Customer/Hooks/useRevealOnScrollUp";
import { colors } from "../../../../../Shared/Styles/commonStyles";

import { ScreenHeader } from "../../../../Components/ScreenHeader";
import { useProducts } from "../../../../Hooks/useProducts";
import type {
  CustomerStackParamList,
  CustomerTabParamList,
} from "../../../../Types/navigation";
import type { Product } from "../../../../Types/product";
import { ProductCard } from "../../../Home/Components/ProductCard";
import { CategoryCard } from "../../Components/CategoryCard";

import {
  CATEGORIES,
  FILTERS,
  TREND_BANNER,
  type CategoryFilter,
} from "../../Data/data";

import { GRID_GAP, SCREEN_PADDING, styles } from "./styles";

type CategoryNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<CustomerTabParamList, "Category">,
  NativeStackNavigationProp<CustomerStackParamList>
>;

type FilterChipProps = {
  item: CategoryFilter;
  selected: boolean;
  onPress: (id: CategoryFilter["id"]) => void;
};

const AUDIENCE_TYPES: Record<string, string[]> = {
  feminino: ["vestido", "saia", "blusa", "cropped", "body", "macaquinho"],
  masculino: [
    "camiseta",
    "camisa",
    "calca",
    "bermuda",
    "short",
    "moletom",
    "jaqueta",
  ],
  infantil: ["infantil", "bebe", "kids", "crianca"],
};

function normalizeType(value: string): string {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  const exceptions = ["tenis", "jeans", "shorts"];

  if (exceptions.includes(normalized)) {
    return normalized === "shorts" ? "short" : normalized;
  }

  return normalized.endsWith("s") ? normalized.slice(0, -1) : normalized;
}

function matchesCategory(product: Product, categoryName: string): boolean {
  return normalizeType(product.type) === normalizeType(categoryName);
}

function matchesAudience(type: string, audience: string): boolean {
  const normalizedType = normalizeType(type);
  const allowedTypes = AUDIENCE_TYPES[audience];

  if (!allowedTypes) {
    return true;
  }

  if (audience === "infantil") {
    return allowedTypes.some((value) => normalizedType.includes(value));
  }

  return allowedTypes.some((value) => normalizedType === value);
}

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

export function Category() {
  const navigation = useNavigation<CategoryNavigation>();

  const { width } = useWindowDimensions();

  const { products, isLoading, errorMessage, reload } = useProducts();

  const [searchVisible, setSearchVisible] = useState(false);

  const [selectedFilterId, setSelectedFilterId] = useState<
    CategoryFilter["id"]
  >(FILTERS[0].id);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const { onScroll, translateY } = useRevealOnScrollUp();

  const contentWidth = width - SCREEN_PADDING * 2;

  const cardWidth = (contentWidth - GRID_GAP) / 2;

  const selectedFilter = FILTERS.find(
    (filter) => filter.id === selectedFilterId,
  );

  const filterName = normalizeType(selectedFilter?.label ?? "Todos");

  const audienceProducts = useMemo(() => {
    if (filterName === "novidade") {
      return products.filter((product) => product.isNew);
    }

    return products.filter((product) =>
      matchesAudience(product.type, filterName),
    );
  }, [products, filterName]);

  const visibleCategories = useMemo(() => {
    return CATEGORIES.filter((category) => {
      if (
        filterName === "todos" ||
        filterName === "todo" ||
        filterName === "novidade"
      ) {
        return true;
      }

      return matchesAudience(category.name, filterName);
    }).map((category) => ({
      ...category,
      count: audienceProducts.filter((product) =>
        matchesCategory(product, category.name),
      ).length,
    }));
  }, [audienceProducts, filterName]);

  const selectedProducts = useMemo(() => {
    if (!selectedCategory) {
      return [];
    }

    return audienceProducts.filter((product) =>
      matchesCategory(product, selectedCategory),
    );
  }, [audienceProducts, selectedCategory]);

  const selectedCategoryLabel =
    CATEGORIES.find(
      (category) => normalizeType(category.name) === selectedCategory,
    )?.name ??
    selectedCategory ??
    "";

  function handleSelectFilter(id: CategoryFilter["id"]) {
    setSelectedFilterId(id);
    setSelectedCategory(null);
  }

  function handleSelectCategory(name: string) {
    setSelectedCategory(normalizeType(name));
  }

  function handleBackToCategories() {
    setSelectedCategory(null);
  }

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
      onPress={handleSelectFilter}
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

          {selectedCategory === null ? (
            <>
              {isLoading ? (
                <View style={styles.feedback_container}>
                  <Text style={styles.feedback_title}>
                    Carregando categorias...
                  </Text>
                </View>
              ) : errorMessage ? (
                <View style={styles.feedback_container}>
                  <Text style={styles.feedback_title}>
                    Não foi possível carregar os produtos.
                  </Text>

                  <Text style={styles.feedback_description}>
                    {errorMessage}
                  </Text>

                  <Pressable onPress={reload} accessibilityRole="button">
                    <Text style={styles.feedback_action}>Tentar novamente</Text>
                  </Pressable>
                </View>
              ) : visibleCategories.length === 0 ? (
                <View style={styles.feedback_container}>
                  <Text style={styles.feedback_title}>
                    Nenhuma categoria encontrada
                  </Text>

                  <Text style={styles.feedback_description}>
                    Não há categorias cadastradas para este filtro.
                  </Text>
                </View>
              ) : (
                <View style={styles.grid}>
                  {visibleCategories.map((category) => (
                    <Pressable
                      key={category.id}
                      style={{ width: cardWidth }}
                      onPress={() => handleSelectCategory(category.name)}
                      accessibilityRole="button"
                      accessibilityLabel={`Abrir categoria ${category.name}`}
                    >
                      <CategoryCard
                        name={category.name}
                        count={category.count}
                        image={category.image}
                        style={{ width: cardWidth }}
                      />
                    </Pressable>
                  ))}
                </View>
              )}

              <View style={styles.trend_banner}>
                <View style={styles.trend_texts}>
                  <Text style={styles.trend_title}>{TREND_BANNER.title}</Text>

                  <Text style={styles.trend_subtitle}>
                    {TREND_BANNER.subtitle}
                  </Text>
                </View>

                <Pressable
                  style={styles.trend_button}
                  accessibilityRole="button"
                  onPress={handleOpenSearch}
                >
                  <Text style={styles.trend_button_text}>
                    {TREND_BANNER.cta}
                  </Text>
                </Pressable>
              </View>
            </>
          ) : (
            <View style={styles.results_section}>
              <View style={styles.results_header}>
                <Pressable
                  style={styles.back_button}
                  onPress={handleBackToCategories}
                  accessibilityRole="button"
                  accessibilityLabel="Voltar para categorias"
                >
                  <Ionicons name="arrow-back" size={22} color={colors.text} />
                </Pressable>

                <View style={styles.results_heading}>
                  <Text style={styles.results_title}>
                    {selectedCategoryLabel}
                  </Text>

                  <Text style={styles.results_count}>
                    {selectedProducts.length}{" "}
                    {selectedProducts.length === 1 ? "produto" : "produtos"}
                  </Text>
                </View>
              </View>

              {isLoading ? (
                <View style={styles.feedback_container}>
                  <Text style={styles.feedback_title}>
                    Carregando produtos...
                  </Text>
                </View>
              ) : errorMessage ? (
                <View style={styles.feedback_container}>
                  <Text style={styles.feedback_title}>
                    Não foi possível carregar os produtos.
                  </Text>

                  <Text style={styles.feedback_description}>
                    {errorMessage}
                  </Text>

                  <Pressable onPress={reload} accessibilityRole="button">
                    <Text style={styles.feedback_action}>Tentar novamente</Text>
                  </Pressable>
                </View>
              ) : selectedProducts.length === 0 ? (
                <View style={styles.feedback_container}>
                  <Text style={styles.feedback_title}>
                    Nenhum produto encontrado
                  </Text>

                  <Text style={styles.feedback_description}>
                    Ainda não existem produtos deste tipo.
                  </Text>
                </View>
              ) : (
                <View style={styles.product_grid}>
                  {selectedProducts.map((product) => (
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
              )}
            </View>
          )}
        </Animated.ScrollView>

        <Animated.View
          style={[
            styles.search_area,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <Pressable
            style={styles.search_button}
            onPress={handleOpenSearch}
            accessibilityRole="button"
            accessibilityLabel="Abrir pesquisa"
          >
            <Ionicons
              name="search-outline"
              size={20}
              color={colors.textMuted}
            />

            <Text style={styles.search_placeholder}>
              Buscar peças, lojas ou marcas
            </Text>

            <Ionicons name="options-outline" size={21} color={colors.primary} />
          </Pressable>
        </Animated.View>
      </View>

      <CatalogSearch
        visible={searchVisible}
        products={products}
        onClose={handleCloseSearch}
        onOpenProduct={handleOpenProduct}
      />
    </View>
  );
}
