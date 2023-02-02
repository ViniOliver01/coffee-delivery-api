import { ICreatePurchase } from "../../dtos/ICreatePurchase";
import { Purchase } from "../../infra/typeorm/entities/Purchase";

interface IPurchasesRepository {
  create(data: ICreatePurchase): Promise<Purchase>;
  listById(user_id: string): Promise<Purchase[]>;
}

export { IPurchasesRepository };
