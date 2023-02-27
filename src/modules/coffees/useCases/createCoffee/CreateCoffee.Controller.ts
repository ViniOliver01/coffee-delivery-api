import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCoffeeUseCase } from "./CreateCoffee.UseCase";

class CreateCoffeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, price } = request.body;

    const createCoffeeUseCase = container.resolve(CreateCoffeeUseCase);

    const coffee = await createCoffeeUseCase.execute({ name, description, price });

    return response.status(201).json(coffee);
  }
}

export { CreateCoffeeController };
