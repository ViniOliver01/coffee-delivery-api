import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password, avatar, id }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      avatar,
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
}

export { UsersRepository };
