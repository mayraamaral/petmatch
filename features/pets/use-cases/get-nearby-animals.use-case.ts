import type { AnimalRepository } from "../domain/repositories/animal.repository";
import type { AdopterAnimal } from "../domain/entities/adopter-animal.entity";

export class GetNearbyAnimalsUseCase {
  constructor(private readonly animalRepository: AnimalRepository) {}

  async execute(lat: number, lng: number, radiusKm: number = 50): Promise<AdopterAnimal[]> {
    return this.animalRepository.getNearbyAnimals(lat, lng, radiusKm);
  }
}