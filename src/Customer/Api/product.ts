import type {
  Product,
  ProductClientResponseDTO,
} from "@/Customer/Types/product";
import { api } from "@/Shared/Api/apiConfig";

function mapProduct(dto: ProductClientResponseDTO): Product {
  const price = dto.price ?? 0;
  const finalPrice = dto.finalPrice ?? price;
  const onSale = dto.onSale ?? false;

  return {
    id: dto.id ?? 0,
    name: dto.name ?? "",
    description: dto.description ?? "",
    type: dto.type ?? "",
    color: dto.color ?? "",
    rating: dto.rating ?? null,
    price,
    finalPrice,
    onSale,
    discountPercent:
      onSale && price > 0
        ? Math.max(0, Math.round((1 - finalPrice / price) * 100))
        : 0,
    photoUrls: dto.photoUrls ?? [],
    sizes: (dto.availableSizes ?? []).map((size) => ({
      id: size.id ?? 0,
      label: size.size ?? "",
      quantity: size.quantity ?? 0,
      available: size.available ?? false,
    })),
    isAvailable: dto.availableProduct ?? false,
    isNew: dto.newProduct ?? false,
  };
}

/**
 * GET /product/client/{id}
 */
async function fetchProduct(id: number): Promise<Product> {
  const response = await api.get<ProductClientResponseDTO>(
    `/product/client/${id}`,
  );
  console.log("fetchProduct response:", response.data); // Log the response data for debugging
  return mapProduct(response.data);
}

/**
 * GET /product
 */
async function fetchProducts(): Promise<Product[]> {
  const response = await api.get<ProductClientResponseDTO[]>("/product");
  console.log("fetchProduct response 2:", response.data); // Log the response data for debugging
  return response.data.map(mapProduct);
}

export { fetchProduct, fetchProducts };
