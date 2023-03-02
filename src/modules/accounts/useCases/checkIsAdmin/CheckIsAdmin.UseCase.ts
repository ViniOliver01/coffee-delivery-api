import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "./../../../../shared/errors/AppError";

interface IResponse {
  isAdmin: boolean;
}

@injectable()
class CheckIsAdminUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(email: string): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado", 400);
    }

    const response = await this.usersRepository.checkIsAdmin(email);

    return { isAdmin: response };
  }
}

export { CheckIsAdminUseCase };
