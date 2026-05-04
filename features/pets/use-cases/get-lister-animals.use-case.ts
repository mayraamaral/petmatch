import { CurrentUserEntity } from "../domain/entities/current-user.entity";
import type { AnimalRepository } from "../domain/repositories/animal.repository";
import type { ListerAnimal } from "../domain/entities/lister-animal.entity";

export type ListerAnimalsState = {
  isLister: boolean;
  hasAnimals: boolean;
  animals: ListerAnimal[];
};

export class GetListerAnimalsUseCase {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async execute(userId: string): Promise<ListerAnimalsState> {
    const listerContext = await this.animalRepository.getListerContextByUserId(userId);
    const currentUser = CurrentUserEntity.create(listerContext);

    if (!currentUser.isLister) {
      return { isLister: false, hasAnimals: false, animals: [] };
    }

    if (!currentUser.listerProfileIdValue) {
      return { isLister: true, hasAnimals: false, animals: [] };
    }

    const animals = await this.animalRepository.getAnimalsForLister(
      currentUser.listerProfileIdValue
    );

    return {
      isLister: true,
      hasAnimals: animals.length > 0,
      animals,
    };
  }
}
