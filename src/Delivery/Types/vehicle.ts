import { MaterialCommunityIcons } from "@expo/vector-icons";

/* --------------------------------------------------
   Tipos de veículo aceitos no cadastro de entregador.
-------------------------------------------------- */
export type VehicleType = "motorcycle" | "car" | "bike";

/* --------------------------------------------------
   Todos os campos que o formulário pode ter, somando
   os três tipos. Cada tipo usa só um subconjunto.
-------------------------------------------------- */
export type VehicleFieldName =
  | "brand"
  | "model"
  | "plate"
  | "year"
  | "color"
  | "bikeType";

/* --------------------------------------------------
   Estado do formulário: um valor string por campo.
   Record<A, B> monta um objeto com as chaves de A
   e valores do tipo B, sem precisar listar uma a uma.
-------------------------------------------------- */
export type VehicleFormValues = Record<VehicleFieldName, string>;

/* --------------------------------------------------
   Largura do campo na grade do formulário.
-------------------------------------------------- */
export type VehicleFieldWidth = "full" | "half" | "wide" | "narrow";

/* --------------------------------------------------
   Configuração de um campo.
   kind diz como a tela desenha: caixa de texto comum
   ou botões de escolha (usado no tipo da bike).
-------------------------------------------------- */
export type VehicleFieldConfig = {
  name: VehicleFieldName;
  label: string;
  placeholder: string;
  required: boolean;
  width: VehicleFieldWidth;
  kind: "text" | "options";
  options?: { value: string; label: string }[];
  keyboardType?: "default" | "numeric";
  maxLength?: number;
  autoCapitalize?: "none" | "characters";
};

/* --------------------------------------------------
   Configuração de um tipo de veículo: o que aparece
   no card do topo e quais campos ele exibe.
-------------------------------------------------- */
export type VehicleTypeConfig = {
  type: VehicleType;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  fields: VehicleFieldConfig[];
};
