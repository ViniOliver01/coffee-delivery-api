import { getRepository, Repository } from "typeorm";
import { ICreateUserAddressDTO } from "../../../dtos/ICreateUserAddressDTO";
import { IUsersAddressRepository } from "../../../repositories/IUsersAddressRepository";
import { UserAddress } from "../entities/UserAddress";

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
}

export { UsersAddressRepository };
