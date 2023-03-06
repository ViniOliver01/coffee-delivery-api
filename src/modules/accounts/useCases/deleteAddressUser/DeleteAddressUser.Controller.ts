import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteAddressUserUseCase } from "./DeleteAddressUser.UseCase";

class DeleteAddressUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: address_id } = request.body;

    const deleteAddressUserUseCase = container.resolve(DeleteAddressUserUseCase);

    await deleteAddressUserUseCase.execute(address_id);

    return response.status(200).json({ message: "Endereço deletado com sucesso" });
  }
}

export { DeleteAddressUserController };
