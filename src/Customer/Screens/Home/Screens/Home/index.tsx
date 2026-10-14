import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
    ComponentProps,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    Animated,
    Easing,
    FlatList,
    ImageBackground,
    ImageSourcePropType,
    ListRenderItemInfo,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    Pressable,
    StyleProp,
    Text,
    TextInput,
    useWindowDimensions,
    View,
    ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../../../../Shared/Styles/commonStyles";
import { BottomNavBar, TabKey } from "../../Components/BottomNavBar";
import {
    BANNERS,
    CATEGORIES,
    DELIVERY_Address,
    HomeBanner,
    HomeCategory,
    HomeProduct,
    HomeStore,
    OPEN_ORDERS_COUNT,
    PRODUCTS,
    STORES,
} from "./data";
import {
    PRODUCT_GAP,
    SCREEN_PADDING,
    SEARCH_AREA_HEIGHT,
    styles,
} from "./styles";

type FeatherIconName = ComponentProps<typeof Feather>["name"];

const USE_NATIVE_DRIVER = Platform.OS !== "web";

const WEB_MIN_TOP_INSET = 24;

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
  // No topo (ou no "elástico" do iOS) a busca já está na posição natural.
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

function formatPrice(value: number) {
  const [integer, decimals] = value.toFixed(2).split(".");
  const withThousands = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `R$ ${withThousands},${decimals}`;
}
type CoverImageProps = {
  source?: ImageSourcePropType;
  style: StyleProp<ViewStyle>;
  fallbackColor?: string;
  children?: ReactNode;
};

function CoverImage({
  source,
  style,
  fallbackColor = colors.primarySoft,
  children,
}: CoverImageProps) {
  if (source) {
    return (
      <ImageBackground source={source} style={style}>
        {children}
      </ImageBackground>
    );
  }

  return (
    <View style={[style, { backgroundColor: fallbackColor }]}>{children}</View>
  );
}

type HeaderIconButtonProps = {
  icon: FeatherIconName;
  label: string;
  badge?: number;
  onPress?: () => void;
};

function HeaderIconButton({
  icon,
  label,
  badge,
  onPress,
}: HeaderIconButtonProps) {
  return (
    <Pressable
      style={styles.iconButton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Feather name={icon} size={20} color={colors.text} />

      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
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
        styles.sectionHeader,
        inlineLink ? styles.sectionHeaderInline : styles.sectionHeaderSpread,
      ]}
    >
      <Text style={styles.sectionTitle}>{title}</Text>

      <Pressable onPress={onPressLink} hitSlop={8} accessibilityRole="link">
        <Text style={styles.sectionLink}>Ver mais</Text>
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
      style={styles.categoryItem}
      onPress={() => onPress(item.id)}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <View
        style={[styles.categoryRing, selected && styles.categoryRingSelected]}
      >
        <CoverImage source={item.image} style={styles.categoryImage} />
      </View>

      <Text
        style={[styles.categoryLabel, selected && styles.categoryLabelSelected]}
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
      style={[styles.bannerCard, { width }]}
      fallbackColor={BANNER_FALLBACK_COLOR}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.62)", "rgba(0,0,0,0.25)", "rgba(0,0,0,0)"]}
        locations={[0, 0.55, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.bannerGradient}
      >
        <View style={styles.bannerTag}>
          <Text style={styles.bannerTagText}>{item.tag}</Text>
        </View>

        <Text style={styles.bannerTitle}>{item.title}</Text>

        <View style={styles.bannerFooter}>
          <View style={styles.bannerFooterSide}>
            <Pressable style={styles.bannerButton} accessibilityRole="button">
              <Text style={styles.bannerButtonText}>{item.cta}</Text>
              <Feather name="arrow-right" size={14} color={colors.white} />
            </Pressable>
          </View>

          <View style={styles.bannerDots}>
            {Array.from({ length: total }, (_, index) => (
              <View
                key={index}
                style={[
                  styles.bannerDot,
                  index === activeIndex && styles.bannerDotActive,
                ]}
              />
            ))}
          </View>

          <View style={styles.bannerFooterSide} />
        </View>
      </LinearGradient>
    </CoverImage>
  );
}

function StoreCard({ item }: { item: HomeStore }) {
  return (
    <Pressable
      style={styles.storeCard}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      <CoverImage source={item.image} style={styles.storeImage}>
        {item.tag ? (
          <View style={styles.storeTag}>
            <Text style={styles.storeTagText}>{item.tag}</Text>
          </View>
        ) : null}
      </CoverImage>

      <Text style={styles.storeName} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={styles.storeMeta}>
        <Ionicons name="star" size={11} color={STAR_COLOR} />
        <Text style={styles.storeMetaText}>
          {item.distance} · {item.rating}
        </Text>
        <View style={styles.storeMetaDot} />
      </View>
    </Pressable>
  );
}

type ProductCardProps = {
  item: HomeProduct;
  width: number;
  favorite: boolean;
  onToggleFavorite: (id: string) => void;
};

function ProductCard({
  item,
  width,
  favorite,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <View style={[styles.productCard, { width }]}>
      <CoverImage source={item.image} style={styles.productImage}>
        {item.discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{item.discount}%</Text>
          </View>
        ) : (
          <View />
        )}

        <Pressable
          style={styles.heartButton}
          onPress={() => onToggleFavorite(item.id)}
          hitSlop={6}
          accessibilityRole="button"
          accessibilityLabel={favorite ? "Remover dos favoritos" : "Favoritar"}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={16}
            color={favorite ? colors.primary : colors.text}
          />
        </Pressable>
      </CoverImage>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productStore} numberOfLines={1}>
          {item.store}
        </Text>

        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
          {item.oldPrice ? (
            <Text style={styles.productOldPrice}>
              {formatPrice(item.oldPrice)}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

export function Home() {
  const { width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const topInset =
    Platform.OS === "web"
      ? Math.max(insets.top, WEB_MIN_TOP_INSET)
      : insets.top;

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
      {/* Header: fixo, fora da área que rola */}
      <View style={[styles.header, { paddingTop: topInset + 4 }]}>
        <View style={styles.locationBlock}>
          <Feather name="map-pin" size={18} color={colors.primary} />

          <View>
            <Text style={styles.locationLabel}>ENTREGAR EM</Text>
            <Pressable style={styles.locationRow} accessibilityRole="button">
              <Text style={styles.locationText} numberOfLines={1}>
                {DELIVERY_Address}
              </Text>
              <Feather name="chevron-down" size={16} color={colors.text} />
            </Pressable>
          </View>
        </View>

        <View style={styles.headerActions}>
          <HeaderIconButton icon="bell" label="Notificações" />
          <HeaderIconButton
            icon="shopping-bag"
            label="Pedidos"
            badge={OPEN_ORDERS_COUNT}
          />
        </View>
      </View>

      <View style={styles.body}>
        <Animated.ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
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
            style={styles.horizontalList}
            contentContainerStyle={styles.categoryListContent}
          />

          <View style={styles.bannerSection}>
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
              style={styles.horizontalList}
            />
          </View>

          <SectionHeader title="Lojas perto de você" inlineLink />
          <FlatList
            data={STORES}
            keyExtractor={(item) => item.id}
            renderItem={renderStore}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalList}
            contentContainerStyle={styles.storeListContent}
          />

          <SectionHeader title="Recomendados para você" />
          <View style={styles.productGrid}>
            {PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                width={productWidth}
                favorite={!!favorites[product.id]}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </View>
        </Animated.ScrollView>

        <Animated.View
          style={[
            styles.searchArea,
            { transform: [{ translateY: searchTranslateY }] },
          ]}
        >
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color={colors.textMuted} />

            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar peças, lojas ou marcas"
              placeholderTextColor="#9A9A9A"
              returnKeyType="search"
              style={styles.searchInput}
            />

            <Pressable
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Filtros"
            >
              <MaterialIcons
                name="filter-list"
                size={22}
                color={colors.primary}
              />
            </Pressable>
          </View>
        </Animated.View>
      </View>

      <BottomNavBar activeTab="home" onTabPress={handleTabPress} />
    </View>
  );
}
