import { supabase } from "@/lib/supabase";
import type { AnimalRepository } from "../domain/repositories/animal.repository";
import type { AnimalRegistrationEntity } from "../domain/entities/animal-registration.entity";
import type { UserRole } from "../domain/entities/current-user.entity";

export class SupabaseAnimalRepository implements AnimalRepository {
  async getListerContextByUserId(userId: string): Promise<{
    role: UserRole | null;
    listerProfileId: string | null;
  }> {
    const { data: userRow, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (roleError || !userRow) {
      return {
        role: null,
        listerProfileId: null,
      };
    }

    if (userRow.role !== "LISTER") {
      return {
        role: userRow.role as UserRole,
        listerProfileId: null,
      };
    }

    const { data: listerProfile, error: listerError } = await supabase
      .from("lister_profiles")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (listerError || !listerProfile) {
      return {
        role: "LISTER",
        listerProfileId: null,
      };
    }

    return {
      role: "LISTER",
      listerProfileId: listerProfile.id,
    };
  }

  async createForLister(
    listerProfileId: string,
    entity: AnimalRegistrationEntity
  ): Promise<void> {
    const payload = {
      ...entity.toPersistence(),
      lister_profile_id: listerProfileId,
    };

    const { error: insertError } = await supabase.from("animals").insert(payload);
    if (insertError) throw insertError;
  }

  async hasAnimalsForLister(listerProfileId: string): Promise<boolean> {
    const { count, error } = await supabase
      .from("animals")
      .select("id", { count: "exact", head: true })
      .eq("lister_profile_id", listerProfileId);

    if (error) throw error;
    return (count ?? 0) > 0;
  }
}
