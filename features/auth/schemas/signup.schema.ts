import { z } from "zod";

export const signupSchema = z.object({
  role: z.enum(["adotante", "doador", "abrigo"], { 
    required_error: "Selecione como você quer usar o app",
    invalid_type_error: "Selecione um perfil válido"
  }),
  name: z.string().optional(),
  tradeName: z.string().optional(),
  corporateName: z.string().optional(),
  cnpj: z.string().optional(),
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
}).superRefine((data, ctx) => {
  if (data.role === "adotante" || data.role === "doador") {
    if (!data.name || data.name.trim().length < 2) {
      ctx.addIssue({ 
        code: z.ZodIssueCode.custom, 
        message: "Nome e sobrenome são obrigatórios", 
        path: ["name"] 
      });
    }
  }

  if (data.role === "abrigo") {
    if (!data.tradeName || data.tradeName.trim().length < 2) {
      ctx.addIssue({ 
        code: z.ZodIssueCode.custom, 
        message: "Nome fantasia é obrigatório", 
        path: ["tradeName"] 
      });
    }
    if (!data.corporateName || data.corporateName.trim().length < 2) {
      ctx.addIssue({ 
        code: z.ZodIssueCode.custom, 
        message: "Razão social é obrigatória", 
        path: ["corporateName"] 
      });
    }
    if (!data.cnpj || data.cnpj.replace(/\D/g, '').length !== 14) {
      ctx.addIssue({ 
        code: z.ZodIssueCode.custom, 
        message: "CNPJ inválido", 
        path: ["cnpj"] 
      });
    }
  }
});

export type SignupFormData = z.infer<typeof signupSchema>;
