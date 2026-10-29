import { ImageSourcePropType } from "react-native";

export interface CategoryFilter {
  id: string;
  label: string;
}

export interface CategoryEntry {
  id: string;
  name: string;
  count: number;
  image?: ImageSourcePropType;
}

export const FILTERS: CategoryFilter[] = [
  { id: "women", label: "Feminino" },
  { id: "men", label: "Masculino" },
  { id: "kids", label: "Infantil" },
  { id: "new", label: "Novidades" },
  { id: "shoes", label: "Calçados" },
];

export const CATEGORIES: CategoryEntry[] = [
  { id: "dresses", name: "Vestidos", count: 412 },
  { id: "skirts", name: "Saias", count: 94 },
  { id: "pants", name: "Calças", count: 356 },
  { id: "shirts", name: "Camisetas", count: 289 },
  { id: "hoodies", name: "Moletons", count: 163 },
  { id: "sneakers", name: "Tênis", count: 201 },
  { id: "accessories", name: "Acessórios", count: 78 },
  { id: "jackets", name: "Jaquetas", count: 112 },
];

export const TREND_BANNER = {
  title: "Tendência inverno",
  subtitle: "Tecidos quentes em tons terrosos",
  cta: "Explorar",
};
