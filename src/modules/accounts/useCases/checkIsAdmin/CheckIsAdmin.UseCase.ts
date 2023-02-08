import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
    const response = await this.usersRepository.checkIsAdmin(email);

    return { isAdmin: response };
  }
}

export { CheckIsAdminUseCase };
