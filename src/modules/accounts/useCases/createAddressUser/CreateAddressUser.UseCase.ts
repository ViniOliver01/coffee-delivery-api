import { inject, injectable } from "tsyringe";
import { ICreateUserAddressDTO } from "../../dtos/ICreateUserAddressDTO";
import { UserAddress } from "../../infra/typeorm/entities/UserAddress";
import { IUsersAddressRepository } from "../../repositories/IUsersAddressRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "./../../../../shared/errors/AppError";

@injectable()
class CreateAddressUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersAddressRepository")
    private usersAddressRepository: IUsersAddressRepository
  ) {}

  async execute(data: ICreateUserAddressDTO): Promise<UserAddress> {
    const user = await this.usersRepository.findById(data.user_id);

    if (!user) {
      throw new AppError("Falha ao encontrar usuário", 400);
    }

    const address = await this.usersAddressRepository.create(data);

    return address;
  }
}

export { CreateAddressUserUseCase };
