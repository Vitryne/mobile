import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { RootStackParamList } from "../../../Types/navigation";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Produto">;

const SIZES = [
  { label: "PP", disabled: true },
  { label: "P", disabled: false },
  { label: "M", disabled: false },
  { label: "G", disabled: false },
  { label: "GG", disabled: true },
];

export function Produto({ navigation }: Props) {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Product image area */}
        <View style={styles.image_container}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80",
            }}
            style={styles.product_image}
            resizeMode="contain"
          />

          {/* Back button */}
          <Pressable style={styles.icon_top_left}>
            <Text style={{ fontSize: 18, color: "#333" }}>‹</Text>
          </Pressable>

          {/* Discount badge */}
          <View
            style={[
              styles.badge_discount,
              { top: 16, left: 0, right: 0, alignSelf: "center", width: 68 },
            ]}
          >
            <Text style={styles.badge_discount_text}>-20% OFF</Text>
          </View>

          {/* Top right icons */}
          <View style={styles.icon_top_right}>
            <Pressable style={styles.icon_circle}>
              <Text style={{ fontSize: 16 }}>♡</Text>
            </Pressable>
            <Pressable style={styles.icon_circle}>
              <Text style={{ fontSize: 15 }}>⎙</Text>
            </Pressable>
          </View>
        </View>

        {/* Info card */}
        <View style={styles.info_card}>
          {/* Store row */}
          <View style={styles.store_row}>
            <View style={styles.store_left}>
              <View style={styles.store_icon_box}>
                <Text style={{ fontSize: 14 }}>✉️</Text>
              </View>
              <View>
                <Text style={styles.store_name}>Atelier Lua</Text>
                <Text style={styles.store_meta}>
                  ★ 4,8 (212) · 1,2 km · ABERTA
                </Text>
              </View>
            </View>
            <Text style={styles.store_link}>Ver loja →</Text>
          </View>

          {/* Product name */}
          <Text style={styles.product_name}>
            Vestido Midi Linho — Verde Sálvia
          </Text>

          {/* Price */}
          <View style={styles.price_row}>
            <Text style={styles.price_original}>R$ 240,00</Text>
            <Text style={styles.price_new}>R$ 189,00</Text>
            <Text style={styles.price_saving}>Você economiza R$ 51</Text>
          </View>

          {/* Size selector */}
          <Text style={styles.size_label}>Tamanho</Text>
          <View style={styles.size_row}>
            {SIZES.map((size) => {
              const isSelected = selectedSize === size.label;
              return (
                <Pressable
                  key={size.label}
                  style={[
                    styles.size_option,
                    isSelected && styles.size_option_selected,
                    size.disabled && styles.size_option_disabled,
                  ]}
                  onPress={() => !size.disabled && setSelectedSize(size.label)}
                  disabled={size.disabled}
                >
                  <Text
                    style={[
                      styles.size_text,
                      isSelected && styles.size_text_selected,
                      size.disabled && styles.size_text_disabled,
                    ]}
                  >
                    {size.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Stock warning */}
          {selectedSize === "M" && (
            <View style={styles.stock_warning}>
              <Text>⚠️</Text>
              <Text style={styles.stock_warning_text}>
                Apenas 3 restantes neste tamanho
              </Text>
            </View>
          )}

          {/* Description */}
          <Text style={styles.description_label}>Descrição</Text>
          <Text style={styles.description_text}>
            Vestido midi confeccionado em linho puro, na cor Verde Sálvia.
            Modelagem solta e confortável, ideal para o dia a dia ou ocasiões
            especiais. Possui alças finas ajustáveis e abertura discreta nas
            costas.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom action bar */}
      <View style={styles.bottom_bar}>
        <Pressable style={styles.wishlist_btn}>
          <Text style={{ fontSize: 20 }}>♡</Text>
        </Pressable>
        <Pressable
          style={styles.add_to_cart_btn}
          onPress={() => navigation.navigate("MenuCarrinho")}
        >
          <Text style={styles.add_to_cart_text}>Adicionar ao carrinho</Text>
        </Pressable>
      </View>
    </View>
  );
}
