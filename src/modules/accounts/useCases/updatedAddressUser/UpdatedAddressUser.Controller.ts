import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateUserAddressDTO } from "../../dtos/ICreateUserAddressDTO";
import { UpdatedAddressUserUseCase } from "./UpdatedAddressUser.UseCase";

class UpdatedAddressUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updatedAddressUserUseCase = container.resolve(UpdatedAddressUserUseCase);
    const {
      id,
      name,
      cep,
      city,
      state,
      street,
      number,
      complement,
    }: ICreateUserAddressDTO = request.body;
    const { id: user_id } = request.user;

    const address = await updatedAddressUserUseCase.execute({
      id,
      cep,
      city,
      state,
      street,
      number,
      complement,
      name,
      user_id,
    });

    return response.status(201).json(address);
  }
}

export { UpdatedAddressUserController };
