import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendConfirmMailUseCase } from "./SendConfirmMail.UseCase";

class SendConfirmMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const sendConfirmMailUseCase = container.resolve(SendConfirmMailUseCase);
    const { name, email } = request.body;

    await sendConfirmMailUseCase.execute({ name, email });

    return response.status(200).json({ message: "Email enviado" });
  }
}

export { SendConfirmMailController };
