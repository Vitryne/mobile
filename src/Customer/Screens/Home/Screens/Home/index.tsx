import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo, useRef, useState } from "react";
import {
    Animated,
    Easing,
    FlatList,
    ListRenderItemInfo,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    Pressable,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { BottomNavBar, TabKey } from "../../../../Components/BottomNavBar";
import { CoverImage } from "../../../../Components/CoverImage";
import { SearchBar } from "../../../../Components/SearchBar";
import { HomeHeader } from "../../Components/Header";
import { ProductCard } from "../../Components/ProductCard";
import {
    BANNERS,
    CATEGORIES,
    DELIVERY_ADDRESS,
    HomeBanner,
    HomeCategory,
    HomeStore,
    OPEN_ORDERS_COUNT,
    PRODUCTS,
    STORES,
} from "../../Data/data";
import {
    PRODUCT_GAP,
    SCREEN_PADDING,
    SEARCH_AREA_HEIGHT,
    styles,
} from "./styles";

const USE_NATIVE_DRIVER = Platform.OS !== "web";

const BANNER_FALLBACK_COLOR = "#2B2B2E";
const STAR_COLOR = "#F5A623";

const DIRECTION_THRESHOLD = 12;

type ScrollTracker = {
  lastY: number;
  direction: -1 | 0 | 1;
  travelled: number;
  shown: boolean;
};

type TrackerAction = "show" | "hide" | "reset" | null;

function trackScroll(
  tracker: ScrollTracker,
  y: number,
  hideZone: number,
): TrackerAction {
  if (y <= 0) {
    const wasShown = tracker.shown;
    tracker.lastY = 0;
    tracker.direction = 0;
    tracker.travelled = 0;
    tracker.shown = false;
    return wasShown ? "reset" : null;
  }

  const delta = y - tracker.lastY;
  tracker.lastY = y;
  if (delta === 0) return null;

  const direction = delta > 0 ? 1 : -1;
  if (direction !== tracker.direction) {
    tracker.direction = direction;
    tracker.travelled = 0;
  }

  tracker.travelled += Math.abs(delta);
  if (tracker.travelled < DIRECTION_THRESHOLD) return null;

  if (direction < 0 && !tracker.shown && y > hideZone) {
    tracker.shown = true;
    return "show";
  }

  if (direction > 0 && tracker.shown) {
    tracker.shown = false;
    return "hide";
  }

  return null;
}

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
  onPress: (id: string) => void;
};

function CategoryItem({ item, selected, onPress }: CategoryItemProps) {
  return (
    <Pressable
      style={styles.category_item}
      onPress={() => onPress(item.id)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View
        style={[
          styles.category_ring,
          selected && styles.category_ring_selected,
        ]}
      >
        <CoverImage source={item.image} style={styles.category_image} />
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
    <CoverImage
      source={item.image}
      style={[styles.banner_card, { width }]}
      fallbackColor={BANNER_FALLBACK_COLOR}
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
    </CoverImage>
  );
}

function StoreCard({ item }: { item: HomeStore }) {
  return (
    <Pressable
      style={styles.store_card}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      <CoverImage source={item.image} style={styles.store_image}>
        {item.tag ? (
          <View style={styles.store_tag}>
            <Text style={styles.store_tag_text}>{item.tag}</Text>
          </View>
        ) : null}
      </CoverImage>

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
  const { width: windowWidth } = useWindowDimensions();

  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    CATEGORIES[0].id,
  );
  const [bannerIndex, setBannerIndex] = useState(0);
  const [favorites, setFavorites] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      PRODUCTS.map((product) => [product.id, product.favorite]),
    ),
  );

  const contentWidth = windowWidth - SCREEN_PADDING * 2;
  const productWidth = (contentWidth - PRODUCT_GAP) / 2;

  const scrollY = useRef(new Animated.Value(0)).current;
  const reveal = useRef(new Animated.Value(0)).current;
  const tracker = useRef<ScrollTracker>({
    lastY: 0,
    direction: 0,
    travelled: 0,
    shown: false,
  }).current;

  const searchTranslateY = useMemo(() => {
    const followContent = scrollY.interpolate({
      inputRange: [0, SEARCH_AREA_HEIGHT],
      outputRange: [0, -SEARCH_AREA_HEIGHT],
      extrapolate: "clamp",
    });
    const hiddenFactor = reveal.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return Animated.multiply(followContent, hiddenFactor);
  }, [scrollY, reveal]);

  const animateReveal = useCallback(
    (toValue: 0 | 1) => {
      Animated.timing(reveal, {
        toValue,
        duration: 200,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
    },
    [reveal],
  );

  const handleScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: USE_NATIVE_DRIVER,
        listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const action = trackScroll(
            tracker,
            event.nativeEvent.contentOffset.y,
            SEARCH_AREA_HEIGHT,
          );

          if (action === "show") animateReveal(1);
          else if (action === "hide") animateReveal(0);
          else if (action === "reset") reveal.setValue(0);
        },
      }),
    [scrollY, reveal, tracker, animateReveal],
  );

  function handleTabPress(tab: TabKey) {
    if (tab === "home") return;
  }

  function handleOpenFilters() {}

  function handleToggleFavorite(id: string) {
    setFavorites((previous) => ({ ...previous, [id]: !previous[id] }));
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
      onPress={setSelectedCategoryId}
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
      <HomeHeader address={DELIVERY_ADDRESS} ordersCount={OPEN_ORDERS_COUNT} />

      <View style={styles.body}>
        <Animated.ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scroll_content}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={handleScroll}
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
          <View style={styles.product_grid}>
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                store={product.store}
                price={product.price}
                oldPrice={product.oldPrice}
                discount={product.discount}
                image={product.image}
                favorite={!!favorites[product.id]}
                onToggleFavorite={() => handleToggleFavorite(product.id)}
                style={{ width: productWidth }}
              />
            ))}
          </View>
        </Animated.ScrollView>

        <Animated.View
          style={[
            styles.search_area,
            { transform: [{ translateY: searchTranslateY }] },
          ]}
        >
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onPressFilter={handleOpenFilters}
          />
        </Animated.View>
      </View>

      <BottomNavBar activeTab="home" onTabPress={handleTabPress} />
    </View>
  );
}
