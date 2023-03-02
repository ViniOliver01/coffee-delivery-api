import { Request, Response } from "express";
import { container } from "tsyringe";
import { ConfirmMailUseCase } from "./ConfirmMail.UseCase";

class ConfirmMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const confirmMailUseCase = container.resolve(ConfirmMailUseCase);
    const { token } = request.params;

    await confirmMailUseCase.execute(token);

    return response.status(200).json({ message: "Token validado" });
  }
}

export { ConfirmMailController };
