import { Image, StyleSheet, Text, View } from "react-native";
import { memo } from "react";

import { Fonts } from "@/constants/theme";
import { tokens } from "@/constants/tokens";
import type { ListerAnimal } from "../domain/entities/lister-animal.entity";

const SPECIES_MAP: Record<string, string> = {
  DOG: "Cachorro",
  CAT: "Gato",
  BIRD: "Pássaro",
  RABBIT: "Coelho",
  OTHER: "Outro",
};

const SEX_MAP: Record<string, string> = {
  MALE: "Macho",
  FEMALE: "Fêmea",
  UNKNOWN: "Não sei",
};

const STATUS_MAP: Record<string, string> = {
  AVAILABLE: "Disponível",
  RESERVED: "Reservado",
  ADOPTED: "Adotado",
};

type ListerAnimalCardProps = {
  animal: ListerAnimal;
};

function ListerAnimalCardComponent({ animal }: ListerAnimalCardProps) {
  return (
    <View style={styles.animalCard}>
      {animal.photoUrl ? (
        <Image source={{ uri: animal.photoUrl }} style={styles.animalPhoto} />
      ) : (
        <View style={styles.animalPhotoPlaceholder} />
      )}
      <View style={styles.animalInfo}>
        <Text style={styles.animalName} numberOfLines={1}>
          {animal.name}
        </Text>
        <Text style={styles.animalDetails}>
          {SPECIES_MAP[animal.species] || animal.species} • {SEX_MAP[animal.sex] || animal.sex}
        </Text>
        <Text style={styles.animalLocation} numberOfLines={1}>
          {animal.city}, {animal.state}
        </Text>
        <View
          style={[
            styles.statusBadge,
            animal.adoptionStatus === "AVAILABLE" && styles.statusBadgeAvailable,
            animal.adoptionStatus === "RESERVED" && styles.statusBadgeReserved,
            animal.adoptionStatus === "ADOPTED" && styles.statusBadgeAdopted,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              animal.adoptionStatus === "AVAILABLE" && styles.statusTextAvailable,
              animal.adoptionStatus === "RESERVED" && styles.statusTextReserved,
              animal.adoptionStatus === "ADOPTED" && styles.statusTextAdopted,
            ]}
          >
            {STATUS_MAP[animal.adoptionStatus] || animal.adoptionStatus}
          </Text>
        </View>
      </View>
    </View>
  );
}

// Utilizando memo para evitar re-renderizações desnecessárias na FlatList
export const ListerAnimalCard = memo(ListerAnimalCardComponent);

const styles = StyleSheet.create({
  animalCard: {
    flexDirection: "row",
    backgroundColor: tokens.colors.white,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing[3],
    gap: tokens.spacing[4],
    shadowColor: tokens.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  animalPhoto: {
    width: 100,
    height: 100,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.gray[100],
  },
  animalPhotoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.gray[200],
  },
  animalInfo: {
    flex: 1,
    justifyContent: "center",
    gap: tokens.spacing[1],
  },
  animalName: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize.lg,
    color: tokens.colors.gray[900],
  },
  animalDetails: {
    fontFamily: Fonts.medium,
    fontSize: tokens.fontSize.sm,
    color: tokens.colors.gray[600],
  },
  animalLocation: {
    fontFamily: Fonts.primary,
    fontSize: tokens.fontSize.xs,
    color: tokens.colors.gray[500],
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: tokens.spacing[2],
    paddingVertical: tokens.spacing[1],
    borderRadius: tokens.radius.full,
    marginTop: tokens.spacing[1],
  },
  statusBadgeAvailable: {
    backgroundColor: `${tokens.colors.brand.green}20`,
  },
  statusBadgeReserved: {
    backgroundColor: `${tokens.colors.brand.orange}20`,
  },
  statusBadgeAdopted: {
    backgroundColor: `${tokens.colors.gray[500]}20`,
  },
  statusText: {
    fontFamily: Fonts.bold,
    fontSize: tokens.fontSize.xs,
    textTransform: "uppercase",
  },
  statusTextAvailable: {
    color: tokens.colors.brand.green,
  },
  statusTextReserved: {
    color: tokens.colors.brand.orange,
  },
  statusTextAdopted: {
    color: tokens.colors.gray[600],
  },
});