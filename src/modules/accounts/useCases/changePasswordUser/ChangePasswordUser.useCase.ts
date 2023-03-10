import { compare, hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  user_id: string;
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

@injectable()
class ChangePasswordUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private DateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    old_password,
    new_password,
    confirm_new_password,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    const passwordMatch = await compare(old_password, user.password);

    if (!passwordMatch) {
      throw new AppError("Senha inválida", 400);
    }

    if (new_password !== confirm_new_password) {
      throw new AppError("Senhas não coincidem", 400);
    }

    function verifyPassword(password: string) {
      //Verify password has minimum required
      const minCharacters = password.length >= 8;
      const letters = /[a-z]/.test(password);
      const uppercaseLetters = /[A-Z]/.test(password);
      const numbers = /[0-9]/.test(password);

      if (!minCharacters) {
        throw new AppError("A senha deve conter ao menos 8 caracteres");
      }
      if (!letters) {
        throw new AppError("A senha deve conter ao menos 1 letra minúscula");
      }
      if (!uppercaseLetters) {
        throw new AppError("A senha deve conter ao menos 1 letra maiúscula");
      }
      if (!numbers) {
        throw new AppError("A senha deve conter ao menos 1 número");
      }
    }

    verifyPassword(new_password);

    new_password = await hash(new_password, 8);

    user.password = new_password;

    await this.usersRepository.create(user);
  }
}

export { ChangePasswordUserUseCase };
