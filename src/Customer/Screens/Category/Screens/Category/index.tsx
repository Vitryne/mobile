import { useState } from "react";
import {
    Animated,
    FlatList,
    ListRenderItemInfo,
    Pressable,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { BottomNavBar } from "../../../../../Customer/Components/BottomNavBar";
import { SearchBar } from "../../../../../Customer/Components/SearchBar";
import { useRevealOnScrollUp } from "../../../../../Customer/Hooks/useRevealOnScrollUp";
import { ScreenHeader } from "../../../../Components/ScreenHeader";
import { CategoryCard } from "../../Components/CategoryCard";
import {
    CATEGORIES,
    CategoryFilter,
    FILTERS,
    TREND_BANNER,
} from "../../Data/data";
import { GRID_GAP, SCREEN_PADDING, styles } from "./styles";

type FilterChipProps = {
  item: CategoryFilter;
  selected: boolean;
  onPress: (id: string) => void;
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

export function Category() {
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [selectedFilterId, setSelectedFilterId] = useState(FILTERS[0].id);

  const { onScroll, translateY } = useRevealOnScrollUp();

  const cardWidth = (width - SCREEN_PADDING * 2 - GRID_GAP) / 2;

  function handleOpenFilters() {
    // TODO: abrir a tela/modal de filtros
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

          <View style={styles.grid}>
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                count={category.count}
                image={category.image}
                style={{ width: cardWidth }}
              />
            ))}
          </View>

          <View style={styles.trend_banner}>
            <View style={styles.trend_texts}>
              <Text style={styles.trend_title}>{TREND_BANNER.title}</Text>
              <Text style={styles.trend_subtitle}>{TREND_BANNER.subtitle}</Text>
            </View>

            <Pressable style={styles.trend_button} accessibilityRole="button">
              <Text style={styles.trend_button_text}>{TREND_BANNER.cta}</Text>
            </Pressable>
          </View>
        </Animated.ScrollView>

        <Animated.View
          style={[styles.search_area, { transform: [{ translateY }] }]}
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
