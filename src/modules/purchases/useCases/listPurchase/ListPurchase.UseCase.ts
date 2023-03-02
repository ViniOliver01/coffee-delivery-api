import { inject, injectable } from "tsyringe";
import { UserAddress } from "../../../accounts/infra/typeorm/entities/UserAddress";
import { IUsersAddressRepository } from "../../../accounts/repositories/IUsersAddressRepository";
import { Purchase } from "../../infra/typeorm/entities/Purchase";
import { IPurchasesRepository } from "../../repositories/interfaces/IPurchasesRepository";
import { AppError } from "./../../../../shared/errors/AppError";

interface IResponse {
  purchaseData: Purchase;
  addressData: UserAddress;
}

@injectable()
class ListPurchaseUseCase {
  constructor(
    @inject("PurchasesRepository")
    private purchasesRepository: IPurchasesRepository,
    @inject("UsersAddressRepository")
    private usersAddressRepository: IUsersAddressRepository
  ) {}

  async execute(purchase_id: string): Promise<IResponse> {
    const purchaseData = await this.purchasesRepository.listByPurchaseId(purchase_id);

    if (!purchaseData) {
      throw new AppError("Pedido não encontrado");
    }

    const addressData = await this.usersAddressRepository.findByAddressId(
      purchaseData.address_id
    );

    return {
      purchaseData,
      addressData,
    };
  }
}

export { ListPurchaseUseCase };
