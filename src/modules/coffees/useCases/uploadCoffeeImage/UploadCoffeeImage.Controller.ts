import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCoffeeImageUseCase } from "./UploadCoffeeImage.UseCase";

class UploadCoffeeImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: coffee_id } = request.params;
    const image_file = request.file.filename;

    const uploadCoffeeImageUseCase = container.resolve(UploadCoffeeImageUseCase);

    await uploadCoffeeImageUseCase.execute({ coffee_id, image_file });

    return response.status(204).send();
  }
}

export { UploadCoffeeImageController };
