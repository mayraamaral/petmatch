import type { AnimalRegistrationEntity } from "../entities/animal-registration.entity";
import type { UserRole } from "../entities/current-user.entity";

export type ListerContext = {
  role: UserRole | null;
  listerProfileId: string | null;
};

export interface AnimalRepository {
  getListerContextByUserId(userId: string): Promise<ListerContext>;
  hasAnimalsForLister(listerProfileId: string): Promise<boolean>;
  createForLister(
    listerProfileId: string,
    entity: AnimalRegistrationEntity
  ): Promise<void>;
}
