import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAddressUserUseCase } from "./ListAddressUser.UseCase";

class ListAddressUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listAddressUserUseCase = container.resolve(ListAddressUserUseCase);

    const address_list = await listAddressUserUseCase.execute(user_id);

    return response.status(200).json(address_list);
  }
}

export { ListAddressUserController };
