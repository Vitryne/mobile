import type { useProducts } from "../Hooks/useProducts";

export type CatalogProduct = ReturnType<typeof useProducts>["products"][number];

export type CatalogFilterId = "women" | "men" | "kids" | "new" | "shoes";

export type CatalogCategoryId =
  | "dresses"
  | "skirts"
  | "pants"
  | "shirts"
  | "hoodies"
  | "sneakers"
  | "accessories"
  | "jackets";

type ProductMetadata = CatalogProduct & {
  active?: boolean;
  isActive?: boolean;
  status?: string;
  category?: string;
  categoryName?: string;
  audience?: string | string[];
  gender?: string;
  isNew?: boolean;
  newArrival?: boolean;
  storeName?: string;
  brand?: string;
};

const CATEGORY_NAMES: Record<CatalogCategoryId, string> = {
  dresses: "Vestidos",
  skirts: "Saias",
  pants: "Calças",
  shirts: "Camisetas",
  hoodies: "Moletons",
  sneakers: "Tênis",
  accessories: "Acessórios",
  jackets: "Jaquetas",
};

export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function getActiveProducts(products: CatalogProduct[]) {
  return products.filter((item) => {
    const product = item as ProductMetadata;

    if (product.active === false || product.isActive === false) {
      return false;
    }

    const status = normalizeSearch(product.status ?? "");

    return ![
      "inactive",
      "inativo",
      "deleted",
      "excluido",
      "disabled",
      "desativado",
    ].includes(status);
  });
}

export function getProductCategory(
  item: CatalogProduct,
): CatalogCategoryId | null {
  const product = item as ProductMetadata;

  const text = normalizeSearch(
    [product.category, product.categoryName, product.name, product.type]
      .filter(Boolean)
      .join(" "),
  );

  if (/vestido|dress/.test(text)) {
    return "dresses";
  }

  if (/saia|skirt/.test(text)) {
    return "skirts";
  }

  if (/calca|jeans|pants|trouser/.test(text)) {
    return "pants";
  }

  if (/camisa|camiseta|blusa|shirt|t-shirt|linho/.test(text)) {
    return "shirts";
  }

  if (/moletom|hoodie|sweatshirt/.test(text)) {
    return "hoodies";
  }

  if (/tenis|sneaker|sapato|bota|sandalia|calcado/.test(text)) {
    return "sneakers";
  }

  if (/bolsa|acessorio|cinto|bone|colar|brinco/.test(text)) {
    return "accessories";
  }

  if (/jaqueta|blazer|casaco|jacket|coat/.test(text)) {
    return "jackets";
  }

  return null;
}

export function getProductCategoryName(product: CatalogProduct) {
  const category = getProductCategory(product);

  return category ? CATEGORY_NAMES[category] : "";
}

function getProductAudiences(item: CatalogProduct) {
  const product = item as ProductMetadata;

  const declaredAudience = product.audience ?? product.gender;

  if (declaredAudience) {
    const values = Array.isArray(declaredAudience)
      ? declaredAudience
      : [declaredAudience];

    return values.map(normalizeSearch);
  }

  const category = getProductCategory(product);

  if (category === "dresses" || category === "skirts") {
    return ["women"];
  }

  return [];
}

export function matchesCatalogFilter(
  product: CatalogProduct,
  filter: CatalogFilterId,
) {
  const metadata = product as ProductMetadata;

  if (filter === "new") {
    return metadata.isNew === true || metadata.newArrival === true;
  }

  if (filter === "shoes") {
    return getProductCategory(product) === "sneakers";
  }

  const audiences = getProductAudiences(product);

  const aliases: Record<"women" | "men" | "kids", string[]> = {
    women: ["women", "woman", "feminino", "f"],
    men: ["men", "man", "masculino", "m"],
    kids: ["kids", "infantil", "crianca"],
  };

  return audiences.some((audience) => aliases[filter].includes(audience));
}

export function filterCatalogProducts(
  products: CatalogProduct[],
  filter: CatalogFilterId,
) {
  return getActiveProducts(products).filter((product) =>
    matchesCatalogFilter(product, filter),
  );
}

export function getCategoryProductCount(
  products: CatalogProduct[],
  category: CatalogCategoryId,
  filter?: CatalogFilterId,
) {
  const source = filter
    ? filterCatalogProducts(products, filter)
    : getActiveProducts(products);

  return source.filter((product) => getProductCategory(product) === category)
    .length;
}

export function searchCatalogProducts(
  products: CatalogProduct[],
  query: string,
) {
  const normalizedQuery = normalizeSearch(query);

  if (!normalizedQuery) {
    return [];
  }

  return getActiveProducts(products).filter((item) => {
    const product = item as ProductMetadata;

    const searchText = normalizeSearch(
      [
        product.name,
        product.type,
        product.category,
        product.categoryName,
        product.storeName,
        product.brand,
        getProductCategoryName(product),
      ]
        .filter(Boolean)
        .join(" "),
    );

    return searchText.includes(normalizedQuery);
  });
}
