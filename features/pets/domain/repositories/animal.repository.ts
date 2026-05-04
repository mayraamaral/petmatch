import type { AnimalRegistrationEntity } from "../entities/animal-registration.entity";
import type { UserRole } from "../entities/current-user.entity";
import type { ListerAnimal } from "../entities/lister-animal.entity";
import type { AdopterAnimal } from "../entities/adopter-animal.entity";

export type ListerContext = {
  role: UserRole | null;
  listerProfileId: string | null;
};

export interface AnimalRepository {
  getListerContextByUserId(userId: string): Promise<ListerContext>;
  hasAnimalsForLister(listerProfileId: string): Promise<boolean>;
  getAnimalsForLister(listerProfileId: string): Promise<ListerAnimal[]>;
  getNearbyAnimals(lat: number, lng: number, radiusKm: number): Promise<AdopterAnimal[]>;
  createForLister(
    listerProfileId: string,
    entity: AnimalRegistrationEntity
  ): Promise<void>;
}
