export type UserRole = "ADOPTER" | "LISTER";

type UserContext = {
  role: UserRole | null;
  listerProfileId: string | null;
};

export class CurrentUserEntity {
  private constructor(private readonly context: UserContext) {}

  static create(context: UserContext): CurrentUserEntity {
    return new CurrentUserEntity(context);
  }

  get isLister(): boolean {
    return this.context.role === "LISTER";
  }

  get listerProfileIdValue(): string | null {
    return this.context.listerProfileId;
  }

  get listerProfileId(): string {
    if (!this.context.listerProfileId) {
      throw new Error("Perfil de doador/abrigo não encontrado.");
    }
    return this.context.listerProfileId;
  }

  canCreateAnimal(): boolean {
    return this.isLister && !!this.context.listerProfileId;
  }
}
