import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPurchasesUseCase } from "./ListPurchases.UseCase";

class ListPurchasesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listPurchasesUseCase = container.resolve(ListPurchasesUseCase);

    const purchase = await listPurchasesUseCase.execute(user_id);

    return response.status(200).json(purchase);
  }
}

export { ListPurchasesController };
