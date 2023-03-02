import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCoffeeUseCase } from "./DeleteCoffee.UseCase";

class DeleteCoffeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCoffeeUseCase = container.resolve(DeleteCoffeeUseCase);

    await deleteCoffeeUseCase.execute(id);

    return response.status(204).json({ message: "Café excluído com sucesso" });
  }
}

export { DeleteCoffeeController };
