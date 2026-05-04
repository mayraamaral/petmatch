import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/features/auth/context/auth.context";
import { SupabaseAnimalRepository } from "../infrastructure/supabase-animal.repository";
import { GetListerAnimalsUseCase } from "../use-cases/get-lister-animals.use-case";
import type { ListerAnimal } from "../domain/entities/lister-animal.entity";

type UseListerHomeResult = {
  isLoading: boolean;
  isLister: boolean;
  hasAnimals: boolean;
  animals: ListerAnimal[];
  refresh: () => Promise<void>;
};

const animalRepository = new SupabaseAnimalRepository();
const getListerAnimalsUseCase = new GetListerAnimalsUseCase(animalRepository);

export function useListerHome(): UseListerHomeResult {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isLister, setIsLister] = useState(false);
  const [hasAnimals, setHasAnimals] = useState(false);
  const [animals, setAnimals] = useState<ListerAnimal[]>([]);

  const refresh = useCallback(async () => {
    if (!user) {
      setIsLister(false);
      setHasAnimals(false);
      setAnimals([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const state = await getListerAnimalsUseCase.execute(user.id);
      setIsLister(state.isLister);
      setHasAnimals(state.hasAnimals);
      setAnimals(state.animals);
    } catch {
      setIsLister(false);
      setHasAnimals(false);
      setAnimals([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    isLoading,
    isLister,
    hasAnimals,
    animals,
    refresh,
  };
}
