import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  verifyEmailByUserId(id: string): Promise<User>;
  changePersonalDataByUserId(data: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepository };
