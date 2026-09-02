import { colors, commonStyles } from "@/Shared/Styles/commonStyles";
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
import { styles } from "./styles";

export function Login() {
    const form = useLogin();

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

    return (
        <View style={commonStyles.screen}>
            <View style={styles.header}>
                <View style={styles.logoRow}>
                    <Logo width={150} height={27} color={colors.text} />

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>ENTREGADOR</Text>
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

                    <TouchableOpacity style={styles.forgotPasswordLink}>
                        <Text style={styles.forgotPasswordText}>
                            Esqueci minha senha
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            (!form.isFormValid || form.isSubmitting) &&
                                styles.submitButtonDisabled,
                        ]}
                        activeOpacity={0.8}
                        disabled={!form.isFormValid || form.isSubmitting}
                        onPress={handleLogin}
                    >
                        <Text style={styles.submitButtonText}>
                            {form.isSubmitting ? "Entrando..." : "Entrar"}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.dividerRow}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>ou</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <TouchableOpacity
                        style={styles.googleButton}
                        activeOpacity={0.8}
                        onPress={handleGoogleLogin}
                    >
                        {/* TODO: trocar por um ícone oficial do Google (svg/asset), esse "G" é só placeholder */}
                        <Text style={styles.googleIconPlaceholder}>G</Text>
                        <Text style={styles.googleButtonText}>
                            Entrar com o Google
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.signupRow}>
                        <Text style={styles.signupText}>Novo por aqui? </Text>
                        <TouchableOpacity>
                            <Text style={styles.signupLink}>
                                Quero ser entregador
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.clientLoginRow}>
                        {/* TODO: adicionar ícone de pessoa aqui, se tiver uma lib de ícones */}
                        <Text style={styles.clientLoginText}>
                            Entrar como cliente
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}