import { getRepository, Repository } from "typeorm";
import { ICreatePurchase } from "../../../dtos/ICreatePurchase";
import { IPurchasesRepository } from "../../../repositories/interfaces/IPurchasesRepository";
import { Purchase } from "../entities/Purchase";

class PurchasesRepository implements IPurchasesRepository {
  private repository: Repository<Purchase>;

  constructor() {
    this.repository = getRepository(Purchase);
  }

  async create({
    purchase_id,
    address_id,
    created_at,
    status,
    user_id,
    cart,
    delivery_value,
    products_value,
    total_value,
    payment_type,
  }: ICreatePurchase): Promise<Purchase> {
    const purchase = this.repository.create({
      purchase_id,
      address_id,
      user_id,
      cart,
      created_at,
      status,
      delivery_value,
      products_value,
      total_value,
      payment_type,
    });

    await this.repository.save(purchase);

    return purchase;
  }
  async listByUserId(user_id: string): Promise<Purchase[]> {
    const purchases = await this.repository.find({ user_id });
    return purchases;
  }

  async listByPurchaseId(purchase_id: string): Promise<Purchase> {
    const purchase = await this.repository.findOne({ id: purchase_id });
    return purchase;
  }
}

export { PurchasesRepository };
