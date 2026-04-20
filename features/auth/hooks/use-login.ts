import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

import { AuthError, type AuthErrorCode } from "../domain/errors/auth.errors";
import { SupabaseAuthRepository } from "../infrastructure/supabase-auth.repository";
import type { LoginFormData } from "../schemas/login.schema";
import { LoginUseCase } from "../use-cases/login.use-case";

const authRepository = new SupabaseAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);

const UI_MESSAGES: Record<AuthErrorCode, string> = {
  INVALID_CREDENTIALS: "E-mail ou senha inválidos.",
  INVALID_CONFIRMATION_CODE: "Código de confirmação inválido.",
  EMAIL_NOT_CONFIRMED: "Confirme seu e-mail antes de entrar.",
  RATE_LIMITED: "Muitas tentativas. Tente novamente em alguns minutos.",
  NETWORK: "Sem conexão. Verifique sua internet.",
  UNKNOWN: "Não foi possível entrar. Tente novamente.",
};

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await loginUseCase.execute(data);
    } catch (error) {
      const code = error instanceof AuthError ? error.code : "UNKNOWN";

      if (code === "EMAIL_NOT_CONFIRMED") {
        router.push({
          pathname: "/confirm-email",
          params: { email: data.email.trim().toLowerCase() },
        } as any);
        return;
      }

      Alert.alert("Erro ao entrar", UI_MESSAGES[code]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleLogin,
    isLoading,
  };
}
