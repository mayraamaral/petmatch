import { UserRegistrationEntity } from "../domain/entities/user-registration.entity";
import type { AuthRepository } from "../domain/repositories/auth.repository";
import type { SignupFormData } from "../schemas/signup.schema";

export class SignupUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(rawData: SignupFormData) {
    const userEntity = UserRegistrationEntity.create(rawData);

    const result = await this.authRepository.signUp(userEntity);

    return result;
  }
}
