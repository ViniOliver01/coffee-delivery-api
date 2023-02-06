import { inject, injectable } from "tsyringe";
import { ICreateUserAddressDTO } from "../../dtos/ICreateUserAddressDTO";
import { UserAddress } from "../../infra/typeorm/entities/UserAddress";
import { IUsersAddressRepository } from "../../repositories/IUsersAddressRepository";

@injectable()
class UpdatedAddressUserUseCase {
  constructor(
    @inject("UsersAddressRepository")
    private usersAddressRepository: IUsersAddressRepository
  ) {}

  async execute(data: ICreateUserAddressDTO): Promise<UserAddress> {
    const address = await this.usersAddressRepository.create(data);

    return address;
  }
}

export { UpdatedAddressUserUseCase };
