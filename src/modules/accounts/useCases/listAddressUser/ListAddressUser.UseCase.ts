import { inject, injectable } from "tsyringe";
import { UserAddress } from "../../infra/typeorm/entities/UserAddress";
import { IUsersAddressRepository } from "../../repositories/IUsersAddressRepository";

@injectable()
class ListAddressUserUseCase {
  constructor(
    @inject("UsersAddressRepository")
    private usersAddressRepository: IUsersAddressRepository
  ) {}

  async execute(user_id: string): Promise<UserAddress[]> {
    const address_list = await this.usersAddressRepository.listAddressByUserId(user_id);

    return address_list;
  }
}

export { ListAddressUserUseCase };
