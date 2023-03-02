import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class ResetPasswordCheckTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token inválido!");
    }

    const isTokenExpired = this.dateProvider.verifyIsExpired(userToken.expires_date);

    if (isTokenExpired) {
      throw new AppError("Token inválido!");
    }

    return;
  }
}

export { ResetPasswordCheckTokenUseCase };
