import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordCheckTokenUseCase } from "./ResetPasswordCheckToken.UseCase";

class ResetPasswordCheckTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const resetPasswordCheckTokenUseCase = container.resolve(
      ResetPasswordCheckTokenUseCase
    );
    const { token } = request.query;

    await resetPasswordCheckTokenUseCase.execute(String(token));

    return response.status(200).json({ message: "Token válido" });
  }
}

export { ResetPasswordCheckTokenController };
