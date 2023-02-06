import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateUserAddressDTO } from "../../dtos/ICreateUserAddressDTO";
import { CreateAddressUserUseCase } from "./CreateAddressUser.UseCase";

class CreateAddressUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createAddressUserUseCase = container.resolve(CreateAddressUserUseCase);
    const { name, cep, city, state, street, number, complement }: ICreateUserAddressDTO =
      request.body;
    const { id: user_id } = request.user;

    const address = await createAddressUserUseCase.execute({
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

export { CreateAddressUserController };
