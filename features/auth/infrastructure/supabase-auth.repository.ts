import { supabase } from "@/lib/supabase";
import type { AuthRepository } from "../domain/repositories/auth.repository";
import type { UserRegistrationEntity } from "../domain/entities/user-registration.entity";

export class SupabaseAuthRepository implements AuthRepository {
  async signUp(userEntity: UserRegistrationEntity): Promise<{ id: string }> {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userEntity.email,
      password: userEntity.password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Usuário não criado");

    const userId = authData.user.id;

    const { error: userError } = await supabase.from("users").insert({
      id: userId,
      email: userEntity.email,
      role: userEntity.role,
    });

    if (userError) throw userError;

    const profileInsertMap = {
      ADOPTER: () => supabase.from("adopter_profiles").insert(userEntity.toAdopterProfile(userId)),
      LISTER: () => supabase.from("lister_profiles").insert(userEntity.toListerProfile(userId)),
    };

    const { error: profileError } = await profileInsertMap[userEntity.role]();
    if (profileError) throw profileError;

    return { id: userId };
  }
}
