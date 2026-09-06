import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef } from "react";
import {
    Image,
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
import type { RootStackParamList } from "../../../Types/navigation";
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
            console.log("login mockado ok");
        } else {
            console.log("login mockado falhou");
        }
    }

    function handleGoogleLogin() {
        
    }

    function handleGoToRegister() {
        navigation.navigate("Register1");
    }

    return (
        <View style={commonStyles.screen}>
            <View style={styles.header}>
                <View style={styles.logo_row}>
                    <Logo width={159} height={28} color={colors.text} />

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
                        placeholder="email@vitryne.com"
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
                        <Image 
                            source={require('../../../../../assets/Images/google.png')} 
                            style={styles.google_icon} 
                        />

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
                    <Octicons name={"person"} size={20} color={colors.textMuted}/>
                    <Text style={styles.client_login_text}>
                        Entrar como cliente
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}