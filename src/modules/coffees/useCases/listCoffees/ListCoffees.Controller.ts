import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCoffeesUseCase } from "./ListCoffees.UseCase";

class ListCoffeesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCoffeesUseCase = container.resolve(ListCoffeesUseCase);

    const coffees = await listCoffeesUseCase.execute();

    return response.status(201).json(coffees);
  }
}

export { ListCoffeesController };
