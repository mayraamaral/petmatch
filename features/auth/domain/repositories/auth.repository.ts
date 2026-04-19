import { UserRegistrationEntity } from "../entities/user-registration.entity";

export interface AuthRepository {
  signUp(entity: UserRegistrationEntity): Promise<{ id: string }>;
}