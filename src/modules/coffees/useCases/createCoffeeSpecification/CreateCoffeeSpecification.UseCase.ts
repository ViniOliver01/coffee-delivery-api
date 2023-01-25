import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

@injectable()
class CreateCoffeeSpecificationUseCase {
  constructor(
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(coffee_id: string, specifications_id: string[]): Promise<void> {
    const coffee = await this.coffeesRepository.findById(coffee_id);

    if (!coffee) {
      throw new AppError("Coffee does not exists");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    if (!specifications) {
      throw new AppError("Specifications does not exists");
    }
    coffee.specifications = specifications;

    console.log(coffee);

    await this.coffeesRepository.create(coffee);
  }
}

export { CreateCoffeeSpecificationUseCase };
