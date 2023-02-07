import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPurchaseUseCase } from "./ListPurchase.UseCase";

class ListPurchaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listPurchaseUseCase = container.resolve(ListPurchaseUseCase);

    const purchase = await listPurchaseUseCase.execute(id);

    return response.status(200).json(purchase);
  }
}

export { ListPurchaseController };
