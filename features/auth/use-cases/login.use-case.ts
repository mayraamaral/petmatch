import { UserCredentialsEntity } from "../domain/entities/user-credentials.entity";
import type { AuthRepository } from "../domain/repositories/auth.repository";
import type { LoginFormData } from "../schemas/login.schema";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(rawData: LoginFormData): Promise<void> {
    const credentials = UserCredentialsEntity.create(rawData);
    await this.authRepository.login(credentials);
  }
}
