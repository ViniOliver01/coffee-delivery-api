import { hash } from "bcryptjs";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as UUIDv4 } from "uuid";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/mailProvider/IMailProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    function verifyPassword(password: string) {
      //Verify password has minimum required
      const minCharacters = password.length > 8;
      const letters = /[a-z]/.test(password);
      const uppercaseLetters = /[A-Z]/.test(password);
      const numbers = /[0-9]/.test(password);

      if (!minCharacters) {
        throw new AppError("Password must be at least 8 characters");
      }
      if (!letters) {
        throw new AppError("Password must have at least one lower case letter");
      }
      if (!uppercaseLetters) {
        throw new AppError("Password must have at least one upper case letter");
      }
      if (!numbers) {
        throw new AppError("Password must have at least one number");
      }
    }

    verifyPassword(password);

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "newUserConfirmation.hbs"
    );

    const token = UUIDv4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date,
    });

    const variables = {
      name: user.name,
      link: `${process.env.CONFIRM_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Confirmar criação de conta",
      variables,
      templatePath
    );
  }
}

export { CreateUserUseCase };
