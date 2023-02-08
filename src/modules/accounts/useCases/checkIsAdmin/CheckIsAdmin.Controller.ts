import { Request, Response } from "express";
import { container } from "tsyringe";
import { CheckIsAdminUseCase } from "./CheckIsAdmin.UseCase";

class CheckIsAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const checkIsAdminUseCase = container.resolve(CheckIsAdminUseCase);

    const { email } = request.body;

    const isAdmin = await checkIsAdminUseCase.execute(email);

    return response.status(200).json(isAdmin);
  }
}

export { CheckIsAdminController };
