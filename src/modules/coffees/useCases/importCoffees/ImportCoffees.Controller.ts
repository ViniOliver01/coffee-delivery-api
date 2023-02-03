import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCoffeesUseCase } from "./ImportCoffees.UseCase";

class ImportCoffeesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCoffeesUseCase = container.resolve(ImportCoffeesUseCase);

    await importCoffeesUseCase.execute(file);

    return response.send();
  }
}

export { ImportCoffeesController };
