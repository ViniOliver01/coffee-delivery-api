import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatar.UseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const { id } = request.user;
    const avatar_file = request.file.filename;

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
