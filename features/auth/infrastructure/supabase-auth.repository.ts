import { supabase } from "@/lib/supabase";
import type { AuthRepository } from "../domain/repositories/auth.repository";
import type { UserRegistrationEntity } from "../domain/entities/user-registration.entity";

export class SupabaseAuthRepository implements AuthRepository {
  async signUp(userEntity: UserRegistrationEntity): Promise<{ id: string }> {
    const { data, error } = await supabase.auth.signUp({
      email: userEntity.email,
      password: userEntity.password,
      options: {
        data: userEntity.toAuthMetadata(),
      },
    });

    if (error) throw error;
    if (!data.user) throw new Error("Usuário não criado");

    return { id: data.user.id };
  }
}
