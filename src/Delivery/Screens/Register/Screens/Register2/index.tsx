import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { DocumentUploadItem } from "../../Components/DocumentUploadItem";
import { PrimaryButton } from "../../Components/PrimaryButton";
import { RegisterHeader } from "../../Components/RegisterHeader";
import type { DeliveryStackParamList } from "../../Types/navigation";
import { styles } from "./styles";

type NavigationProps = NativeStackNavigationProp<DeliveryStackParamList>;

type Document = {
  id: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  status: DocumentStatus;
};

export function Register2() {
  const navigation = useNavigation<NavigationProps>();

  // dados mockados
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "cnh_front",
      label: "CNH (frente)",
      icon: "file-text",
      status: "pending",
    },
    {
      id: "cnh_back",
      label: "CNH (verso)",
      icon: "file-text",
      status: "pending",
    },
    { id: "crlv", label: "CRLV", icon: "credit-card", status: "pending" },
    {
      id: "address",
      label: "Comprovante de residência",
      icon: "home",
      status: "invalid",
    },
    {
      id: "selfie",
      label: "Selfie de verificação",
      icon: "user",
      status: "pending",
    },
  ]);

  const isAllDocumentsSent = documents.every((doc) => doc.status === "sent");

  function handleUploadDocument(documentId: string) {
    setDocuments((previous) =>
      previous.map((doc) =>
        doc.id === documentId ? { ...doc, status: "sent" } : doc,
      ),
    );
  }

  function handleContinue() {
    navigation.navigate("Register3");
  }

  return (
    <View style={styles.container}>
      <RegisterHeader currentStep={2} />

      <ScrollView
        style={commonStyles.flex_1}
        contentContainerStyle={styles.scroll_content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Envie seus documentos</Text>
        <Text style={styles.subtitle}>Passo 2 de 4 · Documentos</Text>

        <View style={styles.documents_list}>
          {documents.map((document) => (
            <DocumentUploadItem
              key={document.id}
              label={document.label}
              icon={document.icon}
              status={document.status}
              onPress={() => handleUploadDocument(document.id)}
            />
          ))}
        </View>

        <View style={styles.info_box}>
          <Feather name="check" size={16} color={colors.primary} />
          <Text style={styles.info_box_text}>
            Seus documentos são criptografados e usados só para verificação.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          label="Continuar"
          onPress={handleContinue}
          disabled={!isAllDocumentsSent}
        />
      </View>
    </View>
  );
}