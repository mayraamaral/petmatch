import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { SignupUseCase } from "../use-cases/signup.use-case";
import { SupabaseAuthRepository } from "../infrastructure/supabase-auth.repository";
import type { SignupFormData } from "../schemas/signup.schema";

// Instancia as dependências (Injeção de Dependência manual)
const authRepository = new SupabaseAuthRepository();
const signupUseCase = new SignupUseCase(authRepository);

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      await signupUseCase.execute(data);
      router.replace({
        pathname: "/confirm-email",
        params: { email: data.email.trim().toLowerCase() },
      } as any);
    } catch (error: any) {
      console.error("Signup error:", error);
      Alert.alert("Erro ao criar conta", error.message || "Ocorreu um erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSignup,
    isLoading,
  };
}
