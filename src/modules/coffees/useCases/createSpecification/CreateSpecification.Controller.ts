import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecification.UseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

    await createSpecificationUseCase.execute(name);

    return response.status(201).json();
  }
}

export { CreateSpecificationController };
