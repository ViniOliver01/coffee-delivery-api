import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { AppError } from "./../../../../shared/errors/AppError";

@injectable()
class ConfirmMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<void> {
    const user_token = await this.usersTokensRepository.findByRefreshToken(token);

    if (!user_token) {
      throw new AppError("Token inválido");
    }

    await this.usersRepository.verifyEmailByUserId(user_token.user_id);

    await this.usersTokensRepository.deleteById(user_token.id);
  }
}

export { ConfirmMailUseCase };
