import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserDataUseCase } from "./UpdateUserData.UseCase";

class UpdateUserDataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserDataUseCase = container.resolve(UpdateUserDataUseCase);

    const { id } = request.user;
    const { avatar, email, name, phone } = request.body;

    const user = await updateUserDataUseCase.execute({
      user_id: id,
      avatar,
      email,
      name,
      phone,
    });

    return response.status(200).json(user);
  }
}

export { UpdateUserDataController };
