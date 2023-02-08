import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCoffeeSpecificationUseCase } from "./CreateCoffeeSpecification.UseCase";

interface IRequest {
  coffees: {
    coffee_id: string;
    specifications_ids: string[];
  }[];
}

class CreateCoffeeSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCoffeeSpecificationUseCase = container.resolve(
      CreateCoffeeSpecificationUseCase
    );
    const coffees: IRequest = request.body;

    await createCoffeeSpecificationUseCase.execute(coffees);

    return response.status(201).json();
  }
}

export { CreateCoffeeSpecificationController };
