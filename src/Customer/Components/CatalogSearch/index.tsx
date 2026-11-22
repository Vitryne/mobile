import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../../Shared/Styles/commonStyles";
import {
  getActiveProducts,
  normalizeSearch,
  searchCatalogProducts,
  type CatalogProduct,
} from "../../Data/catalog";
import { STORES } from "../../Screens/Home/Data/data";
import { styles } from "./styles";

type CatalogSearchProps = {
  visible: boolean;
  products: CatalogProduct[];
  onClose: () => void;
  onOpenProduct: (id: number) => void;
};

type Suggestion = {
  id: string;
  label: string;
  description: string;
  type: "product" | "store";
  productId?: number;
};

export default function CatalogSearch({
  visible,
  products,
  onClose,
  onOpenProduct,
}: CatalogSearchProps) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const activeProducts = useMemo(() => getActiveProducts(products), [products]);

  const results = useMemo(
    () => searchCatalogProducts(products, query),
    [products, query],
  );

  const suggestions = useMemo(() => {
    const normalized = normalizeSearch(query);

    if (!normalized) {
      return [];
    }

    const productSuggestions: Suggestion[] = results.map((product) => ({
      id: `product-${product.id}`,
      label: product.name,
      description: "Produto",
      type: "product",
      productId: product.id,
    }));

    const storeSuggestions: Suggestion[] = STORES.filter((store) =>
      normalizeSearch(store.name).includes(normalized),
    ).map((store) => ({
      id: `store-${store.id}`,
      label: store.name,
      description: "Loja",
      type: "store",
    }));

    return [...productSuggestions, ...storeSuggestions].slice(0, 8);
  }, [query, results]);

  const hasQuery = query.trim().length > 0;

  function saveSearch(value: string) {
    const cleanValue = value.trim();

    if (!cleanValue) {
      return;
    }

    setHistory((previous) =>
      [
        cleanValue,
        ...previous.filter(
          (item) => normalizeSearch(item) !== normalizeSearch(cleanValue),
        ),
      ].slice(0, 5),
    );
  }

  function handleSubmit(value = query) {
    if (!value.trim()) {
      return;
    }

    setQuery(value);
    setSubmitted(true);
    saveSearch(value);
  }

  function handleChangeText(value: string) {
    setQuery(value);
    setSubmitted(false);
  }

  function handleOpenSuggestion(suggestion: Suggestion) {
    saveSearch(suggestion.label);

    if (suggestion.type === "product" && suggestion.productId !== undefined) {
      handleClose();
      onOpenProduct(suggestion.productId);
      return;
    }

    setQuery(suggestion.label);
    setSubmitted(true);
  }

  function handleOpenProduct(productId: number) {
    saveSearch(query);
    handleClose();
    onOpenProduct(productId);
  }

  function handleClose() {
    setQuery("");
    setSubmitted(false);
    onClose();
  }

  function handleClearHistory() {
    setHistory([]);
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Pressable
            style={styles.back_button}
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Feather name="arrow-left" size={20} color={colors.text} />
          </Pressable>

          <View style={styles.input_container}>
            <Feather name="search" size={18} color={colors.textMuted} />

            <TextInput
              style={styles.input}
              placeholder="Buscar peças, lojas ou marcas"
              placeholderTextColor={colors.description}
              value={query}
              onChangeText={handleChangeText}
              onSubmitEditing={() => handleSubmit()}
              returnKeyType="search"
              autoCapitalize="none"
              autoFocus
            />

            {hasQuery && (
              <Pressable
                onPress={() => handleChangeText("")}
                accessibilityRole="button"
                accessibilityLabel="Limpar busca"
              >
                <Feather name="x" size={18} color={colors.textMuted} />
              </Pressable>
            )}
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {!hasQuery && (
            <>
              <View style={styles.section_header}>
                <Text style={styles.section_title}>Pesquisas recentes</Text>

                {history.length > 0 && (
                  <Pressable onPress={handleClearHistory}>
                    <Text style={styles.clear_text}>Limpar</Text>
                  </Pressable>
                )}
              </View>

              {history.length === 0 ? (
                <Text style={styles.empty_text}>Nenhuma pesquisa recente.</Text>
              ) : (
                history.map((item) => (
                  <Pressable
                    key={item}
                    style={styles.list_row}
                    onPress={() => handleSubmit(item)}
                  >
                    <Feather name="clock" size={17} color={colors.textMuted} />

                    <Text style={styles.row_title}>{item}</Text>

                    <Feather
                      name="arrow-up-left"
                      size={17}
                      color={colors.textMuted}
                    />
                  </Pressable>
                ))
              )}

              <Text style={styles.catalog_count}>
                {activeProducts.length} produtos disponíveis
              </Text>
            </>
          )}

          {hasQuery && !submitted && (
            <>
              <Text style={styles.section_title}>Sugestões</Text>

              {suggestions.map((suggestion) => (
                <Pressable
                  key={suggestion.id}
                  style={styles.list_row}
                  onPress={() => handleOpenSuggestion(suggestion)}
                >
                  <Feather
                    name={
                      suggestion.type === "store" ? "shopping-bag" : "search"
                    }
                    size={17}
                    color={colors.textMuted}
                  />

                  <View style={styles.row_content}>
                    <Text style={styles.row_title} numberOfLines={1}>
                      {suggestion.label}
                    </Text>

                    <Text style={styles.row_subtitle}>
                      {suggestion.description}
                    </Text>
                  </View>

                  <Feather
                    name="arrow-up-left"
                    size={17}
                    color={colors.textMuted}
                  />
                </Pressable>
              ))}

              <Pressable
                style={styles.search_action}
                onPress={() => handleSubmit()}
              >
                <Feather name="search" size={17} color={colors.primary} />

                <Text style={styles.search_action_text}>
                  {`Buscar "${query.trim()}"`}
                </Text>
              </Pressable>
            </>
          )}

          {submitted && (
            <>
              <Text style={styles.section_title}>
                Resultados ({results.length})
              </Text>

              {results.length === 0 ? (
                <View style={styles.empty_state}>
                  <Feather name="search" size={28} color={colors.description} />

                  <Text style={styles.empty_title}>
                    Nenhum produto encontrado
                  </Text>

                  <Text style={styles.empty_text}>
                    Tente utilizar outro termo.
                  </Text>
                </View>
              ) : (
                results.map((product) => (
                  <Pressable
                    key={product.id}
                    style={styles.product_row}
                    onPress={() => handleOpenProduct(product.id)}
                    accessibilityRole="button"
                  >
                    {product.photoUrls[0] ? (
                      <Image
                        source={{
                          uri: product.photoUrls[0],
                        }}
                        style={styles.product_image}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={styles.product_image} />
                    )}

                    <View style={styles.row_content}>
                      <Text style={styles.row_title} numberOfLines={2}>
                        {product.name}
                      </Text>

                      <Text style={styles.row_subtitle}>{product.type}</Text>

                      <Text style={styles.price_text}>
                        {product.finalPrice.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </Text>
                    </View>

                    <Feather
                      name="chevron-right"
                      size={18}
                      color={colors.textMuted}
                    />
                  </Pressable>
                ))
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
