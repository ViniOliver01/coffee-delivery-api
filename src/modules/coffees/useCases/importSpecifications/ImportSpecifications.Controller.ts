import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportSpecificationsUseCase } from "./ImportSpecifications.UseCase";

class ImportSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importSpecificationsUseCase = container.resolve(ImportSpecificationsUseCase);

    await importSpecificationsUseCase.execute(file);

    return response.send();
  }
}

export { ImportSpecificationsController };
