import { getRepository, Repository } from "typeorm";
import { ICreateUserAddressDTO } from "../../../dtos/ICreateUserAddressDTO";
import { IUsersAddressRepository } from "../../../repositories/IUsersAddressRepository";
import { UserAddress } from "../entities/UserAddress";
import { AppError } from "./../../../../../shared/errors/AppError";

class UsersAddressRepository implements IUsersAddressRepository {
  private repository: Repository<UserAddress>;

  constructor() {
    this.repository = getRepository(UserAddress);
  }

  async create({
    id,
    user_id,
    name,
    cep,
    city,
    state,
    street,
    number,
    created_at,
    complement,
  }: ICreateUserAddressDTO): Promise<UserAddress> {
    const address = this.repository.create({
      id,
      user_id,
      name,
      cep,
      city,
      state,
      street,
      number,
      created_at,
      complement,
    });

    await this.repository.save(address);

    return address;
  }

  async listAddressByUserId(user_id: string): Promise<UserAddress[]> {
    const addressList = await this.repository.find({ user_id });

    return addressList;
  }

  async findByAddressId(id: string): Promise<UserAddress> {
    const address = await this.repository.findOne(id);

    return address;
  }

  async deleteByAddressId(id: string): Promise<void> {
    const address = await this.repository.findOne(id);

    if (!address) {
      throw new AppError("Nenhum endereço encontrado");
    }

    await this.repository.delete(id);
  }
}

export { UsersAddressRepository };
