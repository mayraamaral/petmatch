import type { LoginFormData } from "../../schemas/login.schema";

export class UserCredentialsEntity {
  private constructor(private readonly data: LoginFormData) {}

  static create(data: LoginFormData): UserCredentialsEntity {
    return new UserCredentialsEntity({
      email: data.email.trim().toLowerCase(),
      password: data.password,
    });
  }

  get email() {
    return this.data.email;
  }

  get password() {
    return this.data.password;
  }
}
