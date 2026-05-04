import { useCallback, useEffect, useState, useRef } from "react";

import type { AdopterAnimal } from "../domain/entities/adopter-animal.entity";
import { SupabaseAnimalRepository } from "../infrastructure/supabase-animal.repository";
import { GetNearbyAnimalsUseCase } from "../use-cases/get-nearby-animals.use-case";
import { useDeviceLocation } from "./use-device-location";

const animalRepository = new SupabaseAnimalRepository();
const getNearbyAnimalsUseCase = new GetNearbyAnimalsUseCase(animalRepository);

const NEARBY_ANIMALS_RADIUS_KM = 50;

export function useFindPets() {
  const { resolveCurrentLocation } = useDeviceLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [animals, setAnimals] = useState<AdopterAnimal[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Use de ref para evitar múltiplas chamadas simultâneas
  const isFetchingRef = useRef(false);

  const fetchPets = useCallback(async () => {
    if (isFetchingRef.current) return;

    try {
      isFetchingRef.current = true;
      setIsLoading(true);
      setError(null);
      const location = await resolveCurrentLocation();

      const nearbyAnimals = await getNearbyAnimalsUseCase.execute(
        Number(location.latitude),
        Number(location.longitude),
        NEARBY_ANIMALS_RADIUS_KM,
      );

      setAnimals(nearbyAnimals);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar pets próximos.");
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [resolveCurrentLocation]);

  useEffect(() => {
    void fetchPets();
  }, [fetchPets]);

  const handleAccept = () => {
    setAnimals((prev) => prev.slice(1));
    // TODO: Save to DB in the future (match/like)
  };

  const handleReject = () => {
    setAnimals((prev) => prev.slice(1));
    // TODO: Save to DB in the future (reject)
  };

  return {
    isLoading,
    error,
    currentAnimal: animals[0] || null,
    handleAccept,
    handleReject,
    retry: fetchPets,
  };
}
