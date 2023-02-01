import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatar.UseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const { id } = request.user;
    const avatar_file = request.file.filename;

    const avatar_url = await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file,
    });

    return response.status(200).json({ avatar_url: avatar_url });
  }
}

export { UpdateUserAvatarController };
