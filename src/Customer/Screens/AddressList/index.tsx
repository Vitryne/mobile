import { useAddresses } from "@/Customer/Hooks/useAddresses";
import type { ClientAddress } from "@/Customer/Types/address";
import type { CustomerStackParamList } from "@/Customer/Types/navigation";
import { ScreenHeader } from "@/Shared/Components/ScreenHeader";
import { colors } from "@/Shared/Styles/commonStyles";
import { Feather } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddressCard from "./Components/AddressCard";
import { styles } from "./styles";

type Props = NativeStackScreenProps<CustomerStackParamList, "AddressList">;

export function AddressList({ navigation, route }: Props) {
  const isOrderMode = route.params?.mode === "order";

  const {
    addresses,
    defaultAddressId,
    loading,
    error,
    selectingId,
    reload,
    chooseForOrder,
  } = useAddresses();

  function handleAdd() {
    navigation.navigate("AddressForm");
  }

  function handleEdit(address: ClientAddress) {
    navigation.navigate("AddressForm", { addressId: address.id });
  }

  async function handleChoose(address: ClientAddress) {
    if (address.selected) {
      navigation.goBack();
      return;
    }

    const success = await chooseForOrder(address.id);

    if (success) navigation.goBack();
  }

  function renderContent() {
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (error && addresses.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.message_text}>{error}</Text>

          <Pressable
            style={styles.retry_button}
            onPress={reload}
            accessibilityRole="button"
          >
            <Text style={styles.retry_text}>Tentar novamente</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <FlatList
        data={addresses}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <AddressCard
            address={item}
            mode={isOrderMode ? "order" : "manage"}
            isDefault={item.id === defaultAddressId}
            isLoading={selectingId === item.id}
            disabled={selectingId !== null}
            onPress={isOrderMode ? handleChoose : handleEdit}
            onEdit={handleEdit}
          />
        )}
        contentContainerStyle={styles.list_content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          error ? <Text style={styles.error_text}>{error}</Text> : null
        }
        ListEmptyComponent={
          <View style={styles.empty_state}>
            <Feather name="map" size={28} color={colors.primary} />
            <Text style={styles.empty_title}>Nenhum endereço cadastrado</Text>
            <Text style={styles.message_text}>
              Adicione um endereço para receber seus pedidos.
            </Text>
          </View>
        }
        ListFooterComponent={
          <Pressable
            style={styles.add_button}
            onPress={handleAdd}
            accessibilityRole="button"
          >
            <Text style={styles.add_button_text}>Adicionar novo endereço</Text>
          </Pressable>
        }
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <ScreenHeader
        title="Endereços"
        subtitle={
          isOrderMode
            ? "Escolha onde receber este pedido"
            : "Seus endereços de entrega"
        }
      />

      {renderContent()}
    </SafeAreaView>
  );
}
