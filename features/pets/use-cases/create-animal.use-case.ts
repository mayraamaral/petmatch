import type { AnimalRepository } from "../domain/repositories/animal.repository";
import type { AnimalPhotoRepository } from "../domain/repositories/animal-photo.repository";
import type { CreateAnimalFormData } from "../schemas/create-animal.schema";
import { AnimalRegistrationEntity } from "../domain/entities/animal-registration.entity";
import { CurrentUserEntity } from "../domain/entities/current-user.entity";

export class CreateAnimalUseCase {
  constructor(
    private readonly animalRepository: AnimalRepository,
    private readonly animalPhotoRepository: AnimalPhotoRepository
  ) {}

  async execute(raw: CreateAnimalFormData, userId: string): Promise<void> {
    const listerContext = await this.animalRepository.getListerContextByUserId(userId);
    const currentUser = CurrentUserEntity.create(listerContext);
    if (!currentUser.canCreateAnimal()) {
      if (!currentUser.isLister) {
        throw new Error("Somente doadores e abrigos podem cadastrar pets.");
      }
      throw new Error("Perfil de doador/abrigo não encontrado.");
    }

    const uploadedPhotos = await Promise.all(
      raw.photoUris.map((uri) => this.animalPhotoRepository.uploadPhoto(uri, userId))
    );

    const storagePaths = uploadedPhotos.map((photo) => photo.storagePath);
    const entity = AnimalRegistrationEntity.create(raw, storagePaths);

    try {
      await this.animalRepository.createForLister(currentUser.listerProfileId, entity);
    } catch (error) {
      try {
        await Promise.all(
          storagePaths.map((path) => this.animalPhotoRepository.deletePhoto(path))
        );
      } catch (cleanupError) {
        console.error("Falha ao remover fotos após erro ao cadastrar pet.", {
          storagePaths,
          cleanupError,
          originalError: error,
        });
      }
      throw error;
    }
  }
}
