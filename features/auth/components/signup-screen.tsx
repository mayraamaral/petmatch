import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm, useWatch } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/ui/button";
import { LogoFull } from "@/components/ui/logo-full";
import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";
import { signupSchema, type SignupFormData } from "../schemas/signup.schema";
import { useSignup } from "../hooks/use-signup";

const ROLES = [
  { value: "adotante", label: "Quero adotar" },
  { value: "doador", label: "Quero doar um pet" },
  { value: "abrigo", label: "Sou um abrigo / ONG" },
] as const;

export function SignupScreen() {
  const router = useRouter();
  const { handleSignup, isLoading } = useSignup();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: undefined,
      name: "",
      tradeName: "",
      corporateName: "",
      cnpj: "",
      email: "",
      password: "",
    },
  });

  const selectedRole = useWatch({
    control,
    name: "role",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <View style={styles.logoContainer}>
              <LogoFull size="sm" />
            </View>

            <View style={styles.formContainer}>
              {/* Etapa 1: Seleção de Perfil */}
              <View style={styles.inputGroup}>
                <Text style={styles.sectionTitle}>
                  Como você quer usar o app?
                </Text>
                <Controller
                  control={control}
                  name="role"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.roleContainer}>
                      {ROLES.map((role) => (
                        <Pressable
                          key={role.value}
                          style={[
                            styles.roleButton,
                            value === role.value && styles.roleButtonActive,
                          ]}
                          onPress={() => onChange(role.value)}
                        >
                          <Text
                            style={[
                              styles.roleButtonText,
                              value === role.value &&
                                styles.roleButtonTextActive,
                            ]}
                          >
                            {role.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  )}
                />
                {errors.role && (
                  <Text style={styles.errorText}>{errors.role.message}</Text>
                )}
              </View>

              {/* Etapa 2: Restante do Formulário (Só aparece se selectedRole tiver valor) */}
              {selectedRole && (
                <View style={styles.animatedFormSection}>
                  {/* Campos para Adotante ou Doador */}
                  {(selectedRole === "adotante" ||
                    selectedRole === "doador") && (
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>Nome e sobrenome</Text>
                      <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <TextInput
                            style={[
                              styles.input,
                              errors.name && styles.inputError,
                            ]}
                            placeholder="Digite seu nome completo"
                            placeholderTextColor={tokens.colors.gray[500]}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                          />
                        )}
                      />
                      {errors.name && (
                        <Text style={styles.errorText}>
                          {errors.name.message}
                        </Text>
                      )}
                    </View>
                  )}

                  {/* Campos para Abrigo */}
                  {selectedRole === "abrigo" && (
                    <>
                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nome fantasia</Text>
                        <Controller
                          control={control}
                          name="tradeName"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              style={[
                                styles.input,
                                errors.tradeName && styles.inputError,
                              ]}
                              placeholder="Digite o nome fantasia"
                              placeholderTextColor={tokens.colors.gray[500]}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                            />
                          )}
                        />
                        {errors.tradeName && (
                          <Text style={styles.errorText}>
                            {errors.tradeName.message}
                          </Text>
                        )}
                      </View>

                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>Razão social</Text>
                        <Controller
                          control={control}
                          name="corporateName"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              style={[
                                styles.input,
                                errors.corporateName && styles.inputError,
                              ]}
                              placeholder="Digite a razão social"
                              placeholderTextColor={tokens.colors.gray[500]}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                            />
                          )}
                        />
                        {errors.corporateName && (
                          <Text style={styles.errorText}>
                            {errors.corporateName.message}
                          </Text>
                        )}
                      </View>

                      <View style={styles.inputGroup}>
                        <Text style={styles.label}>CNPJ</Text>
                        <Controller
                          control={control}
                          name="cnpj"
                          render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                              style={[
                                styles.input,
                                errors.cnpj && styles.inputError,
                              ]}
                              placeholder="Digite o CNPJ"
                              placeholderTextColor={tokens.colors.gray[500]}
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              keyboardType="numeric"
                            />
                          )}
                        />
                        {errors.cnpj && (
                          <Text style={styles.errorText}>
                            {errors.cnpj.message}
                          </Text>
                        )}
                      </View>
                    </>
                  )}

                  {/* Campos Comuns (Email e Senha) */}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>E-mail</Text>
                    <Controller
                      control={control}
                      name="email"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={[
                            styles.input,
                            errors.email && styles.inputError,
                          ]}
                          placeholder="Digite seu e-mail"
                          placeholderTextColor={tokens.colors.gray[500]}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      )}
                    />
                    {errors.email && (
                      <Text style={styles.errorText}>
                        {errors.email.message}
                      </Text>
                    )}
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Senha</Text>
                    <Controller
                      control={control}
                      name="password"
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={[
                            styles.input,
                            errors.password && styles.inputError,
                          ]}
                          placeholder="Crie uma senha"
                          placeholderTextColor={tokens.colors.gray[500]}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          secureTextEntry
                        />
                      )}
                    />
                    {errors.password && (
                      <Text style={styles.errorText}>
                        {errors.password.message}
                      </Text>
                    )}
                  </View>

                  <Button
                    label={isLoading ? "CRIANDO CONTA..." : "CRIAR CONTA"}
                    variant="primary"
                    size="md"
                    onPress={handleSubmit(handleSignup)}
                    containerStyle={styles.buttonContainer}
                    disabled={isLoading}
                  />
                </View>
              )}

              <Pressable
                onPress={() => router.push("/login" as any)}
                style={styles.linkContainer}
              >
                <Text style={styles.linkText}>
                  Já tem uma conta? Faça login
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: tokens.colors.brand.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: tokens.spacing[6],
  },
  card: {
    backgroundColor: tokens.colors.white,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing[6],
    shadowColor: tokens.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: tokens.spacing[6],
    marginTop: tokens.spacing[2],
  },
  formContainer: {
    gap: tokens.spacing[4],
  },
  animatedFormSection: {
    gap: tokens.spacing[4],
    marginTop: tokens.spacing[2],
  },
  inputGroup: {
    gap: tokens.spacing[2],
  },
  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize.base,
    color: tokens.colors.gray[800],
    marginBottom: tokens.spacing[2],
    textAlign: "center",
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.gray[700],
  },
  input: {
    borderWidth: 1,
    borderColor: tokens.colors.gray[300],
    borderRadius: tokens.radius.md,
    paddingHorizontal: tokens.spacing[4],
    paddingVertical: tokens.spacing[3],
    fontFamily: Fonts.primary,
    fontSize: tokens.fontSize.base,
    color: tokens.colors.gray[900],
    backgroundColor: tokens.colors.white,
  },
  inputError: {
    borderColor: tokens.colors.red[500],
  },
  errorText: {
    fontFamily: Fonts.primary,
    fontSize: tokens.fontSize.xs,
    color: tokens.colors.red[500],
  },
  buttonContainer: {
    marginTop: tokens.spacing[2],
  },
  roleContainer: {
    gap: tokens.spacing[3],
  },
  roleButton: {
    borderWidth: 1,
    borderColor: tokens.colors.gray[300],
    borderRadius: tokens.radius.md,
    paddingVertical: tokens.spacing[4],
    paddingHorizontal: tokens.spacing[4],
    backgroundColor: tokens.colors.white,
  },
  roleButtonActive: {
    borderColor: tokens.colors.brand.green,
    backgroundColor: tokens.colors.brand.green + "10", // Verde com 10% de opacidade
  },
  roleButtonText: {
    fontFamily: Fonts.primary,
    fontSize: tokens.fontSize.base,
    color: tokens.colors.gray[600],
    textAlign: "center",
  },
  roleButtonTextActive: {
    color: tokens.colors.brand.green,
    fontFamily: Fonts.bold,
  },
  linkContainer: {
    alignItems: "center",
    marginTop: tokens.spacing[2],
    paddingVertical: tokens.spacing[2],
  },
  linkText: {
    fontFamily: Fonts.medium,
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.brand.primary,
  },
});
