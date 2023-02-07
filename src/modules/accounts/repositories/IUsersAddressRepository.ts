import { ICreateUserAddressDTO } from "../dtos/ICreateUserAddressDTO";
import { UserAddress } from "../infra/typeorm/entities/UserAddress";

interface IUsersAddressRepository {
  create(data: ICreateUserAddressDTO): Promise<UserAddress>;
  listAddressByUserId(user_id: string): Promise<UserAddress[]>;
  findByAddressId(id: string): Promise<UserAddress>;
}

export { IUsersAddressRepository };
