import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./ResetPassword.UseCase";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
    const { token } = request.query;
    const { password } = request.body;

    await resetPasswordUseCase.execute({
      token: String(token),
      password,
    });

    return response.status(200).json();
  }
}

export { ResetPasswordController };
