import type { SignupFormData } from "../../schemas/signup.schema";

export type UserRole = "ADOPTER" | "LISTER";
export type ListerType = "INDIVIDUAL" | "SHELTER";

export class UserRegistrationEntity {
  private constructor(private readonly data: SignupFormData) {}

  static create(data: SignupFormData): UserRegistrationEntity {
    // Aqui você pode colocar validações de domínio que o Zod não cobre
    return new UserRegistrationEntity(data);
  }

  get email() {
    return this.data.email;
  }

  get password() {
    return this.data.password;
  }

  get role(): UserRole {
    return this.data.role === "adotante" ? "ADOPTER" : "LISTER";
  }

  get isAdopter(): boolean {
    return this.role === "ADOPTER";
  }

  get isLister(): boolean {
    return this.role === "LISTER";
  }

  get isIndividual(): boolean {
    return this.data.role === "doador";
  }

  get isShelter(): boolean {
    return this.data.role === "abrigo";
  }

  toAdopterProfile(userId: string) {
    if (!this.isAdopter) throw new Error("Usuário não é adotante");
    
    return {
      user_id: userId,
      name: this.data.name,
    };
  }

  toListerProfile(userId: string) {
    if (!this.isLister) throw new Error("Usuário não é doador/abrigo");

    const listerType: ListerType = this.isIndividual ? "INDIVIDUAL" : "SHELTER";

    return {
      user_id: userId,
      lister_type: listerType,
      name: this.isIndividual ? this.data.name : null,
      trade_name: this.isShelter ? this.data.tradeName : null,
      corporate_name: this.isShelter ? this.data.corporateName : null,
      cnpj: this.isShelter ? this.data.cnpj : null,
    };
  }
}
