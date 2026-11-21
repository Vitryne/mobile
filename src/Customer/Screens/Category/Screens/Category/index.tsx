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
import { useRevealOnScrollUp } from "../../../../../Customer/Hooks/useRevealOnScrollUp";
import { colors } from "../../../../../Shared/Styles/commonStyles";

import { ScreenHeader } from "../../../../Components/ScreenHeader";
import { useProducts } from "../../../../Hooks/useProducts";
import type { CustomerStackParamList } from "../../../../Types/navigation";
import { ProductCard } from "../../../Home/Components/ProductCard";
import { CategoryCard } from "../../Components/CategoryCard";

import { CATEGORIES, TREND_BANNER } from "../../Data/data";

import { GRID_GAP, SCREEN_PADDING, styles } from "./styles";

type CategoryNavigation = NativeStackNavigationProp<CustomerStackParamList>;

type TypeFilter = {
  id: string;
  label: string;
};

type FilterChipProps = {
  item: TypeFilter;
  selected: boolean;
  onPress: (id: string) => void;
};

function normalizeType(value: string): string {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  return normalized.endsWith("s") ? normalized.slice(0, -1) : normalized;
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

  const [selectedFilterId, setSelectedFilterId] = useState("all");

  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const { onScroll, translateY } = useRevealOnScrollUp();

  const contentWidth = width - SCREEN_PADDING * 2;

  const cardWidth = (contentWidth - GRID_GAP) / 2;

  const typeFilters = useMemo<TypeFilter[]>(() => {
    const uniqueTypes = new Map<string, string>();

    products.forEach((product) => {
      const label = product.type.trim();
      const id = normalizeType(label);

      if (id && !uniqueTypes.has(id)) {
        uniqueTypes.set(id, label);
      }
    });

    return [
      { id: "all", label: "Todos" },
      ...Array.from(uniqueTypes, ([id, label]) => ({ id, label })).sort(
        (first, second) => first.label.localeCompare(second.label, "pt-BR"),
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(
    () =>
      selectedFilterId === "all"
        ? products
        : products.filter(
            (product) => normalizeType(product.type) === selectedFilterId,
          ),
    [products, selectedFilterId],
  );

  const visibleCategories = useMemo(
    () =>
      CATEGORIES.map((category) => ({
        ...category,
        count: filteredProducts.filter(
          (product) =>
            normalizeType(product.type) === normalizeType(category.name),
        ).length,
      })).filter((category) => category.count > 0),
    [filteredProducts],
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

  const renderFilter = ({ item }: ListRenderItemInfo<TypeFilter>) => (
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
            data={typeFilters}
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
                  <Pressable
                    key={category.id}
                    onPress={() =>
                      setSelectedFilterId(normalizeType(category.name))
                    }
                    accessibilityRole="button"
                    accessibilityLabel={`Filtrar por ${category.name}`}
                    style={{ width: cardWidth }}
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
