import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as UUIDv4 } from "uuid";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "../../../../shared/container/providers/mailProvider/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class SendConfirmMailUseCase {
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

  async execute({ name, email }: IRequest): Promise<void> {
    const { id: user_id } = await this.usersRepository.findByEmail(email);

    const reset_token = await this.usersTokensRepository.findByType(
      user_id,
      "reset_token"
    );
    console.log("🚀 / SendConfirmMailUseCase / execute / reset_token:", reset_token);

    const token = UUIDv4();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: token,
      expires_date,
      type: "reset_token",
    });

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "newUserConfirmation.hbs"
    );

    const variables = {
      name,
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

export { SendConfirmMailUseCase };
