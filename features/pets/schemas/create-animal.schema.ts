import { z } from "zod";

const coordinateFromInput = (value: string) =>
  Number.parseFloat(value.trim().replace(",", "."));

const latitudeSchema = z
  .string()
  .min(1, "Latitude é obrigatória")
  .refine((value) => {
    const parsed = coordinateFromInput(value);
    return Number.isFinite(parsed) && parsed >= -90 && parsed <= 90;
  }, "Latitude deve estar entre -90 e 90");

const longitudeSchema = z
  .string()
  .min(1, "Longitude é obrigatória")
  .refine((value) => {
    const parsed = coordinateFromInput(value);
    return Number.isFinite(parsed) && parsed >= -180 && parsed <= 180;
  }, "Longitude deve estar entre -180 e 180");

export const createAnimalSchema = z.object({
  photoUri: z.string().trim().min(1, "Foto do pet é obrigatória"),
  name: z.string().trim().min(2, "Nome do pet é obrigatório"),
  species: z.enum(["DOG", "CAT", "BIRD", "RABBIT", "OTHER"], {
    error: "Selecione o tipo do animal",
  }),
  birthDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD")
    .refine((value) => {
      const parsed = new Date(value);
      return !Number.isNaN(parsed.getTime()) && parsed <= new Date();
    }, "Data de nascimento inválida"),
  latitude: latitudeSchema,
  longitude: longitudeSchema,
  city: z.string().trim().min(1, "Cidade é obrigatória"),
  state: z.string().trim().min(1, "Estado é obrigatório"),
  country: z.string().trim().min(1, "País é obrigatório"),
  healthNotes: z.string().trim().optional(),
  behaviorNotes: z.string().trim().optional(),
  interestingFacts: z.string().trim().optional(),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"], {
    error: "Selecione o porte do animal",
  }),
  sex: z.enum(["MALE", "FEMALE", "UNKNOWN"], {
    error: "Selecione o sexo do animal",
  }),
  isNeutered: z.boolean(),
  isVaccinated: z.boolean(),
});

export type CreateAnimalFormData = z.infer<typeof createAnimalSchema>;
