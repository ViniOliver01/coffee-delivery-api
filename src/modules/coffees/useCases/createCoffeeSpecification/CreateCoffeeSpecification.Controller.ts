import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCoffeeSpecificationUseCase } from "./CreateCoffeeSpecification.UseCase";

class CreateCoffeeSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCoffeeSpecificationUseCase = container.resolve(
      CreateCoffeeSpecificationUseCase
    );
    const { id: coffee_id } = request.params;
    const { specifications_id } = request.body;

    await createCoffeeSpecificationUseCase.execute(coffee_id, specifications_id);

    return response.status(201).json();
  }
}

export { CreateCoffeeSpecificationController };
