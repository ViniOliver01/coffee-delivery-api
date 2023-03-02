import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    avatar_url: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private DateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expire_in_refresh_token,
      expire_in_token,
      secret_refresh_token,
      secret_token,
      expire_refresh_token_days,
    } = auth;

    // verifica se o usuário exite
    if (!user) {
      throw new AppError("Email não encontrado", 401);
    }

    const passwordMatch = await compare(password, user.password);

    // verifica a senha
    if (!passwordMatch) {
      throw new AppError("Email ou senha incorreto", 401);
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expire_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expire_in_refresh_token,
    });

    const refresh_token_expires_date = this.DateProvider.addDays(
      expire_refresh_token_days
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
      type: "auth_token",
    });

    const tokenReturn: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url(),
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
