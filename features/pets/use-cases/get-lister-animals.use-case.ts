import { CurrentUserEntity } from "../domain/entities/current-user.entity";
import type { AnimalRepository } from "../domain/repositories/animal.repository";

export type ListerAnimalsState = {
  isLister: boolean;
  hasAnimals: boolean;
};

export class GetListerAnimalsUseCase {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async execute(userId: string): Promise<ListerAnimalsState> {
    const listerContext = await this.animalRepository.getListerContextByUserId(userId);
    const currentUser = CurrentUserEntity.create(listerContext);

    if (!currentUser.isLister) {
      return { isLister: false, hasAnimals: false };
    }

    if (!currentUser.listerProfileIdValue) {
      return { isLister: true, hasAnimals: false };
    }

    const hasAnimals = await this.animalRepository.hasAnimalsForLister(
      currentUser.listerProfileIdValue
    );

    return {
      isLister: true,
      hasAnimals,
    };
  }
}
