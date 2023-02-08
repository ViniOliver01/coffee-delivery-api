import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../../dtos/IUpdateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    avatar,
    phone,
    id,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      avatar,
      phone,
      id,
    });

    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async verifyEmailByUserId(id: string): Promise<User> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ email_is_verified: true })
      .where("id = :id", { id })
      .execute();

    const user = await this.repository.findOne(id);
    return user;
  }

  async changePersonalDataByUserId({
    id,
    avatar,
    email,
    name,
    phone,
  }: IUpdateUserDTO): Promise<User> {
    const user = await this.repository.findOne(id);

    if (avatar) {
      user.avatar = avatar;
    }
    if (email) {
      user.email = email;
    }
    if (name) {
      user.name = name;
    }
    if (phone) {
      user.phone = phone;
    }

    const newUser = this.repository.create({
      id,
      name,
      email,
      avatar,
      phone,
    });

    await this.repository.save(newUser);

    return newUser;
  }
  async checkIsAdmin(email: string): Promise<boolean> {
    const user = await this.repository.findOne({ email, isAdmin: true });
    if (user) {
      return true;
    }
    return false;
  }
}

export { UsersRepository };
