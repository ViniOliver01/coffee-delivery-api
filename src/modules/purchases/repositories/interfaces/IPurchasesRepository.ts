import { ICreatePurchase } from "../../dtos/ICreatePurchase";
import { Purchase } from "../../infra/typeorm/entities/Purchase";

interface IPurchasesRepository {
  create(data: ICreatePurchase): Promise<Purchase>;
  listByUserId(user_id: string): Promise<Purchase[]>;
  listByPurchaseId(purchase_id: string): Promise<Purchase>;
}

export { IPurchasesRepository };
