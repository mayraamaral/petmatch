import { UserRegistrationEntity } from "../entities/user-registration.entity";
import { UserCredentialsEntity } from "../entities/user-credentials.entity";

export interface AuthRepository {
  signUp(entity: UserRegistrationEntity): Promise<{ id: string }>;
  login(entity: UserCredentialsEntity): Promise<void>;
  confirmEmail(email: string, code: string): Promise<void>;
  resendConfirmationEmail(email: string): Promise<void>;
  logout(): Promise<void>;
}
