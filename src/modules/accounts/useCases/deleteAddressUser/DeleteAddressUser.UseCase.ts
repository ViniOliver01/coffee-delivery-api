import { inject, injectable } from "tsyringe";
import { IUsersAddressRepository } from "../../repositories/IUsersAddressRepository";

@injectable()
class DeleteAddressUserUseCase {
  constructor(
    @inject("UsersAddressRepository")
    private usersAddressRepository: IUsersAddressRepository
  ) {}

  async execute(address_id: string): Promise<void> {
    await this.usersAddressRepository.deleteByAddressId(address_id);
  }
}

export { DeleteAddressUserUseCase };
