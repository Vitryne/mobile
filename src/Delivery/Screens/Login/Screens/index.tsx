import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Logo from "../../../../../assets/Images/logo.svg";
import { FormInput } from "../../../Components/FormInput";
import { useLogin } from "../../../Hooks/loginForm";
// TODO: confirme se esse caminho bate com a pasta Types no seu projeto
import type { RootStackParamList } from "../../Types/navigation";
import { styles } from "./styles";

type LoginNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

export function Login() {
    const form = useLogin();
    const navigation = useNavigation<LoginNavigationProp>();

    const scrollViewRef = useRef<ScrollView>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    async function handleLogin() {
        Keyboard.dismiss();
        if (!form.isFormValid || form.isSubmitting) return;

        const success = await form.handleSubmit();
        if (success) {
            // TODO: navegar para a home/lista de ofertas quando a navegação estiver configurada
            console.log("login mockado ok");
        } else {
            // TODO: exibir erro pro usuário quando definirmos como isso deve aparecer
            console.log("login mockado falhou");
        }
    }

    function handleGoogleLogin() {
        // TODO: implementar login com Google
    }

    function handleGoToRegister() {
        navigation.navigate("Register1");
    }

    return (
        <View style={commonStyles.screen}>
            <View style={styles.header}>
                <View style={styles.logo_row}>
                    <Logo width={150} height={27} color={colors.text} />

                    <View style={styles.badge}>
                        <Text style={styles.badge_text}>ENTREGADOR</Text>
                    </View>
                </View>

                <Text style={styles.title}>Olá, de novo.</Text>
                <Text style={styles.subtitle}>
                    Entre para receber ofertas na sua região.
                </Text>
            </View>

            <KeyboardAvoidingView
                style={commonStyles.flex_1}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    ref={scrollViewRef}
                    style={commonStyles.flex_1}
                    contentContainerStyle={styles.scroll_content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <FormInput
                        ref={emailRef}
                        label="E-mail"
                        required
                        placeholder="rafael@vitryne.com"
                        value={form.email}
                        onChangeText={form.setEmail}
                        isValid={form.isEmailValid}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={() => passwordRef.current?.focus()}
                    />

                    <FormInput
                        ref={passwordRef}
                        label="Senha"
                        required
                        isPassword
                        placeholder="Senha"
                        value={form.password}
                        onChangeText={form.setPassword}
                        isValid={form.isPasswordValid}
                        returnKeyType="done"
                        blurOnSubmit={false}
                        onSubmitEditing={handleLogin}
                    />

                    <TouchableOpacity style={styles.forgot_password_link}>
                        <Text style={styles.forgot_password_text}>
                            Esqueci minha senha
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.submit_button,
                            (!form.isFormValid || form.isSubmitting) &&
                                styles.submit_button_disabled,
                        ]}
                        activeOpacity={0.8}
                        disabled={!form.isFormValid || form.isSubmitting}
                        onPress={handleLogin}
                    >
                        <Text style={styles.submit_button_text}>
                            {form.isSubmitting ? "Entrando..." : "Entrar"}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.divider_row}>
                        <View style={styles.divider_line} />
                        <Text style={styles.divider_text}>ou</Text>
                        <View style={styles.divider_line} />
                    </View>

                    <TouchableOpacity
                        style={styles.google_button}
                        activeOpacity={0.8}
                        onPress={handleGoogleLogin}
                    >
                        {/* TODO: trocar por um ícone oficial do Google (svg/asset), esse "G" é só placeholder */}
                        <Text style={styles.google_icon_placeholder}>G</Text>
                        <Text style={styles.google_button_text}>
                            Entrar com o Google
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.signup_row}>
                        <Text style={styles.signup_text}>Novo por aqui? </Text>
                        <TouchableOpacity onPress={handleGoToRegister}>
                            <Text style={styles.signup_link}>
                                Quero ser entregador
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.client_login_row}>
                    {/* TODO: adicionar ícone de pessoa aqui, se tiver uma lib de ícones */}
                    <Text style={styles.client_login_text}>
                        Entrar como cliente
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}