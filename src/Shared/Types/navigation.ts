import type { CustomerStackParamList } from "@/Customer/Types/navigation";
import type { DeliveryStackParamList } from "@/Delivery/Types/navigation";
import type { NavigatorScreenParams } from "@react-navigation/native";

export type AppStackParamList = {
  DeliveryStack: NavigatorScreenParams<DeliveryStackParamList>;
  CustomerStack: NavigatorScreenParams<CustomerStackParamList>;
};
