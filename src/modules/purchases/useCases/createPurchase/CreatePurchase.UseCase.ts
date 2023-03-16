import { inject, injectable } from "tsyringe";
import { ICoffeesRepository } from "../../../coffees/repositories/interfaces/ICoffeesRepository";
import { IPurchaseCart } from "../../dtos/IPurchaseCart";
import { Purchase } from "../../infra/typeorm/entities/Purchase";
import { IPurchasesRepository } from "../../repositories/interfaces/IPurchasesRepository";
import { AppError } from "./../../../../shared/errors/AppError";

interface IRequest {
  user_id: string;
  address_id: string;
  delivery_value: number;
  payment_type: string;
  cart: IPurchaseCart[];
}

@injectable()
class CreatePurchaseUseCase {
  constructor(
    @inject("PurchasesRepository")
    private purchasesRepository: IPurchasesRepository,
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository
  ) {}

  async execute({
    user_id,
    address_id,
    delivery_value,
    payment_type,
    cart,
  }: IRequest): Promise<Purchase> {
    if (cart.length === 0) {
      throw new AppError("Carrinho vazio");
    }

    if (!user_id) {
      throw new AppError("Nenhum usuário encontrado");
    }

    if (!address_id) {
      throw new AppError("Nenhum endereço selecionado");
    }

    if (!payment_type) {
      throw new AppError("Nenhum tipo de pagamento selecionado");
    }

    await Promise.all(
      cart.map(async (coffee) => {
        const data = await this.coffeesRepository.findById(coffee.coffee_id);
        coffee.name = data.name;
        coffee.price = data.price;
        coffee.img_url = data.image_url();
      })
    );

    const products_value = cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    const total_value = products_value + delivery_value;

    const purchase = await this.purchasesRepository.create({
      user_id,
      address_id,
      delivery_value,
      products_value,
      total_value,
      payment_type,
      cart,
    });
    console.log("🚀 / CreatePurchaseUseCase / cart:", cart);

    return purchase;
  }
}

export { CreatePurchaseUseCase };
