import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    avatar_url,
    phone,
    email_is_verified,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      avatar,
      avatar_url,
      phone,
      email_is_verified,
    });
    return user;
  }
}

export { UserMap };
