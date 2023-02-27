import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateSpecificationUseCase } from "./UpdateSpecification.UseCase";

class UpdateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, id } = request.body;

    const updateSpecificationUseCase = container.resolve(UpdateSpecificationUseCase);

    await updateSpecificationUseCase.execute(name, id);

    return response.status(201).json();
  }
}

export { UpdateSpecificationController };
