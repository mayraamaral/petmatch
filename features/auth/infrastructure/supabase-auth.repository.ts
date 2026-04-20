import { supabase } from "@/lib/supabase";
import type { AuthRepository } from "../domain/repositories/auth.repository";
import type { UserRegistrationEntity } from "../domain/entities/user-registration.entity";
import type { UserCredentialsEntity } from "../domain/entities/user-credentials.entity";
import { AuthError } from "../domain/errors/auth.errors";
import { mapSupabaseAuthError } from "./supabase-error-mapper";

export class SupabaseAuthRepository implements AuthRepository {
  async signUp(userEntity: UserRegistrationEntity): Promise<{ id: string }> {
    const { data, error } = await supabase.auth.signUp({
      email: userEntity.email,
      password: userEntity.password,
      options: {
        data: userEntity.toAuthMetadata(),
      },
    });

    if (error) throw mapSupabaseAuthError(error);
    if (!data.user) throw new AuthError("UNKNOWN", "Usuário não criado");

    return { id: data.user.id };
  }

  async login(credentials: UserCredentialsEntity): Promise<void> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw mapSupabaseAuthError(error);
    if (!data.user) throw new AuthError("INVALID_CREDENTIALS");
  }

  async confirmEmail(email: string, code: string): Promise<void> {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "signup",
    });

    if (error) throw mapSupabaseAuthError(error);
  }

  async resendConfirmationEmail(email: string): Promise<void> {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (error) throw mapSupabaseAuthError(error);
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw mapSupabaseAuthError(error);
  }
}
