import { inject, injectable } from "tsyringe";
import { Purchase } from "../../infra/typeorm/entities/Purchase";
import { IPurchasesRepository } from "../../repositories/interfaces/IPurchasesRepository";

@injectable()
class ListPurchaseUseCase {
  constructor(
    @inject("PurchasesRepository")
    private purchasesRepository: IPurchasesRepository
  ) {}

  async execute(purchase_id: string): Promise<Purchase> {
    const response = await this.purchasesRepository.listByPurchaseId(purchase_id);

    return response;
  }
}

export { ListPurchaseUseCase };
