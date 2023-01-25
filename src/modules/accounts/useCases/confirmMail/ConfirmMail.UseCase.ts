import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class ConfirmMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  async execute(token: string): Promise<void> {
    const { user_id } = await this.usersTokensRepository.findByRefreshToken(token);

    await this.usersRepository.verifyEmailByUserId(user_id);
  }
}

export { ConfirmMailUseCase };
