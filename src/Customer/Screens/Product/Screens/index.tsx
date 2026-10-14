import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, commonStyles } from "../../../../Shared/Styles/commonStyles";
import { styles } from "./styles";

export function Product() {
  return (
    <View style={commonStyles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.box, styles.gallery]}>
          <Text style={styles.box_name}>IMAGEM / GALERIA</Text>

          <View style={styles.top_buttons}>
            <TouchableOpacity style={styles.top_button}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>

            <View style={styles.top_buttons_right}>
              <TouchableOpacity style={styles.top_button}>
                <Ionicons name="heart-outline" size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.top_button}>
                <Ionicons name="share-outline" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.sheet}>
          <View style={[styles.box, styles.store]}>
            <Text style={styles.box_name}>LOJA</Text>
          </View>

          <View style={[styles.box, styles.title_price]}>
            <Text style={styles.box_name}>TÍTULO E PREÇO</Text>
          </View>

          <View style={[styles.box, styles.sizes]}>
            <Text style={styles.box_name}>TAMANHO</Text>
          </View>

          <View style={[styles.box, styles.delivery]}>
            <Text style={styles.box_name}>ENTREGA</Text>
          </View>

          <View style={[styles.box, styles.description]}>
            <Text style={styles.box_name}>DESCRIÇÃO</Text>
          </View>

          <View style={[styles.box, styles.review]}>
            <Text style={styles.box_name}>AVALIAÇÃO 1</Text>
          </View>
          <View style={[styles.box, styles.review]}>
            <Text style={styles.box_name}>AVALIAÇÃO 2</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={[styles.box, styles.footer_favorite]}>
          <Ionicons name="heart-outline" size={24} color={colors.primary} />
        </View>

        <View style={[styles.box, styles.footer_add]}>
          <Text style={styles.box_name}>ADICIONAR</Text>
        </View>
      </View>
    </View>
  );
}