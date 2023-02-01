import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangePasswordUserUseCase } from "./ChangePasswordUser.useCase";

class ChangePasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { old_password, new_password, confirm_new_password } = request.body;

    const changePasswordUserUseCase = container.resolve(ChangePasswordUserUseCase);

    await changePasswordUserUseCase.execute({
      user_id,
      old_password,
      new_password,
      confirm_new_password,
    });

    return response.status(201).send();
  }
}

export { ChangePasswordUserController };
