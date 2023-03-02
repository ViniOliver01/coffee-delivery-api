import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCoffeeDataUseCase } from "./UpdateCoffeeData.UseCase";

class UpdateCoffeeDataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, description, price, available } = request.body;

    const updateCoffeeDataUseCase = container.resolve(UpdateCoffeeDataUseCase);

    await updateCoffeeDataUseCase.execute({ id, name, description, price, available });

    return response.status(200).json({ message: "Café atualizado com sucesso" });
  }
}

export { UpdateCoffeeDataController };
