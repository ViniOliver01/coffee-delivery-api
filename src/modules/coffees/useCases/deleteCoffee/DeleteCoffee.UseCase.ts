import { inject, injectable } from "tsyringe";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";
import { AppError } from "./../../../../shared/errors/AppError";

@injectable()
class DeleteCoffeeUseCase {
  constructor(
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const coffee = await this.coffeesRepository.findById(id);

    if (!coffee) {
      throw new AppError("Coffee not found");
    }

    coffee.specifications = []; // remove all specs relationships before delete coffee

    await this.coffeesRepository.create(coffee);

    await this.coffeesRepository.delete(id);
  }
}

export { DeleteCoffeeUseCase };
