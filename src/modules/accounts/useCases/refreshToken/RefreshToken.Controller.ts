import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshToken.UseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const refresh_token =
      request.body.refresh_token ||
      request.headers["x-access-refresh-token"] ||
      request.query.refresh_token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const new_token = await refreshTokenUseCase.execute(refresh_token);

    return response.status(200).json(new_token);
  }
}

export { RefreshTokenController };
