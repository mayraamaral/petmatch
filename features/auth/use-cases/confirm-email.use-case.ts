import type { AuthRepository } from "../domain/repositories/auth.repository";

export class ConfirmEmailUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(email: string, code: string): Promise<void> {
    await this.authRepository.confirmEmail(email, code);
  }
}
