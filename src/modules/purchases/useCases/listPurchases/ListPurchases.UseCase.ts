import { inject, injectable } from "tsyringe";
import { ICoffeesRepository } from "../../../coffees/repositories/interfaces/ICoffeesRepository";
import { Purchase } from "../../infra/typeorm/entities/Purchase";
import { IPurchasesRepository } from "../../repositories/interfaces/IPurchasesRepository";

@injectable()
class ListPurchasesUseCase {
  constructor(
    @inject("PurchasesRepository")
    private purchasesRepository: IPurchasesRepository,
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository
  ) {}

  async execute(user_id: string): Promise<Purchase[]> {
    const purchases = await this.purchasesRepository.listByUserId(user_id);

    if (purchases.length > 0) {
      await Promise.all(
        purchases[0].cart.map(async (coffee) => {
          const data = await this.coffeesRepository.findById(coffee.coffee_id);
          coffee.img_url = data.image_url();
        })
      );
    }

    return purchases;
  }
}

export { ListPurchasesUseCase };
