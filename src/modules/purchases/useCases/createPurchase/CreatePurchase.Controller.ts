import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePurchaseUseCase } from "./CreatePurchase.UseCase";

class CreatePurchaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { cart, address_id } = request.body;

    const createPurchaseUseCase = container.resolve(CreatePurchaseUseCase);

    const purchase = await createPurchaseUseCase.execute({
      user_id,
      address_id,
      cart,
    });

    return response.status(200).json(purchase);
  }
}

export { CreatePurchaseController };
