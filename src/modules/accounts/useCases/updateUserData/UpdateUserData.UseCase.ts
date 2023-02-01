import { inject, injectable } from "tsyringe";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { UserMap } from "../../mapper/UserMap";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar?: string;
  email?: string;
  name?: string;
  phone?: string;
}

@injectable()
class UpdateUserDataUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    user_id,
    avatar,
    email,
    name,
    phone,
  }: IRequest): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.create(user);
    return UserMap.toDTO(user);
  }
}

export { UpdateUserDataUseCase };
