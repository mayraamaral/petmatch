import { z } from "zod";

export const emailConfirmationSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Informe o código de 6 dígitos"),
});

export type EmailConfirmationFormData = z.infer<typeof emailConfirmationSchema>;
