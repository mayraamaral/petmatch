import { z } from 'zod';

export const AdoptionProcessStatusEnum = z.enum([
  'UNDER_REVIEW',
  'IN_PROGRESS',
  'VISIT_PENDING',
  'VISITED',
  'IN_ADAPTATION',
  'ADOPTED',
  'CANCELED',
  'REJECTED',
]);

export type AdoptionProcessStatus = z.infer<typeof AdoptionProcessStatusEnum>;

const baseAdoption = z.object({
  id: z.string().optional(),
  animalId: z.string(),
  notes: z.string().nullable().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const adoptionSchema = z.discriminatedUnion('status', [
  baseAdoption.extend({
    status: z.literal('UNDER_REVIEW'),
    adopterProfileId: z.string().nullable().optional(),
  }),
  baseAdoption.extend({
    status: z.literal('IN_PROGRESS'),
    adopterProfileId: z.string(),
  }),
  baseAdoption.extend({
    status: z.literal('VISIT_PENDING'),
    adopterProfileId: z.string(),
    visitScheduledFor: z.string().datetime(),
  }),
  baseAdoption.extend({
    status: z.literal('VISITED'),
    adopterProfileId: z.string(),
    visitScheduledFor: z.string().datetime(),
    visitedAt: z.string().datetime(),
  }),
  baseAdoption.extend({
    status: z.literal('IN_ADAPTATION'),
    adopterProfileId: z.string(),
    visitScheduledFor: z.string().datetime(),
    visitedAt: z.string().datetime(),
    adaptationStartedAt: z.string().datetime(),
    adaptationEndedAt: z.string().datetime().nullable().optional(),
  }),
  baseAdoption.extend({
    status: z.literal('ADOPTED'),
    adopterProfileId: z.string(),
    visitScheduledFor: z.string().datetime().nullable().optional(),
    visitedAt: z.string().datetime().nullable().optional(),
    adaptationStartedAt: z.string().datetime().nullable().optional(),
    adaptationEndedAt: z.string().datetime().nullable().optional(),
    adoptionDate: z.string().datetime(),
  }),
  baseAdoption.extend({
    status: z.literal('CANCELED'),
    adopterProfileId: z.string().nullable().optional(),
    cancelReason: z.string().min(1),
    visitScheduledFor: z.string().datetime().nullable().optional(),
    visitedAt: z.string().datetime().nullable().optional(),
    adaptationStartedAt: z.string().datetime().nullable().optional(),
    adaptationEndedAt: z.string().datetime().nullable().optional(),
  }),
  baseAdoption.extend({
    status: z.literal('REJECTED'),
    adopterProfileId: z.string().nullable().optional(),
    cancelReason: z.string().min(1),
    decisionNotes: z.string().nullable().optional(),
    visitScheduledFor: z.string().datetime().nullable().optional(),
    visitedAt: z.string().datetime().nullable().optional(),
    adaptationStartedAt: z.string().datetime().nullable().optional(),
    adaptationEndedAt: z.string().datetime().nullable().optional(),
  }),
]);

export type AdoptionData = z.infer<typeof adoptionSchema>;

export const scheduleVisitSchema = z.object({
  adoptionId: z.string(),
  visitScheduledFor: z.string().datetime(),
});

export const registerVisitSchema = z.object({
  adoptionId: z.string(),
  visitedAt: z.string().datetime(),
});

export const startAdaptationSchema = z.object({
  adoptionId: z.string(),
  adaptationStartedAt: z.string().datetime(),
});

export const finalizeAdoptionSchema = z.object({
  adoptionId: z.string(),
  adoptionDate: z.string().datetime(),
  adopterProfileId: z.string(),
});

export const cancelAdoptionSchema = z.object({
  adoptionId: z.string(),
  cancelReason: z.string().min(1),
});

export const rejectAdoptionSchema = z.object({
  adoptionId: z.string(),
  cancelReason: z.string().min(1),
  decisionNotes: z.string().nullable().optional(),
});
