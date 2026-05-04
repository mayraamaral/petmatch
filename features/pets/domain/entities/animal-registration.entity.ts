import type { CreateAnimalFormData } from "../../schemas/create-animal.schema";

type AnimalSpecies = "DOG" | "CAT" | "BIRD" | "RABBIT" | "OTHER";
type AnimalSize = "SMALL" | "MEDIUM" | "LARGE";
type AnimalSex = "MALE" | "FEMALE" | "UNKNOWN";

const toOptionalText = (value?: string) => {
  const normalized = value?.trim();
  return normalized ? normalized : null;
};

const toRequiredText = (value: string) => value.trim();

const parseCoordinate = (value: string) =>
  Number.parseFloat(value.trim().replace(",", "."));

export class AnimalRegistrationEntity {
  private constructor(private readonly data: {
    name: string;
    species: AnimalSpecies;
    birthDate: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    country: string;
    healthNotes: string | null;
    behaviorNotes: string | null;
    interestingFacts: string | null;
    size: AnimalSize;
    sex: AnimalSex;
    isNeutered: boolean;
    isVaccinated: boolean;
    photoUrl: string;
  }) {}

  static create(
    raw: CreateAnimalFormData,
    uploadedPhotoPath: string
  ): AnimalRegistrationEntity {
    return new AnimalRegistrationEntity({
      name: raw.name.trim(),
      species: raw.species,
      birthDate: raw.birthDate,
      latitude: parseCoordinate(raw.latitude),
      longitude: parseCoordinate(raw.longitude),
      city: toRequiredText(raw.city),
      state: toRequiredText(raw.state),
      country: toRequiredText(raw.country),
      healthNotes: toOptionalText(raw.healthNotes),
      behaviorNotes: toOptionalText(raw.behaviorNotes),
      interestingFacts: toOptionalText(raw.interestingFacts),
      size: raw.size,
      sex: raw.sex,
      isNeutered: raw.isNeutered,
      isVaccinated: raw.isVaccinated,
      photoUrl: uploadedPhotoPath,
    });
  }

  toPersistence() {
    return {
      name: this.data.name,
      species: this.data.species,
      birth_date: this.data.birthDate,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      city: this.data.city,
      state: this.data.state,
      country: this.data.country,
      health_notes: this.data.healthNotes,
      behavior_notes: this.data.behaviorNotes,
      interesting_facts: this.data.interestingFacts,
      size: this.data.size,
      sex: this.data.sex,
      is_neutered: this.data.isNeutered,
      is_vaccinated: this.data.isVaccinated,
      photo_url: this.data.photoUrl,
    };
  }
}
