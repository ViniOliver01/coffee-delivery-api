import { inject, injectable } from "tsyringe";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

interface IRequest {
  coffees: {
    coffee_id: string;
    specifications_ids: string[];
  }[];
}

@injectable()
class CreateCoffeeSpecificationUseCase {
  constructor(
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ coffees }: IRequest): Promise<void> {
    coffees.map(async (data) => {
      const coffee = await this.coffeesRepository.findById(data.coffee_id);

      // if (!coffee) {
      //   throw new AppError("Coffee does not exists");
      // }

      const specifications = await this.specificationsRepository.findByIds(
        data.specifications_ids
      );

      // if (specifications.length === 0) {
      //   throw new AppError("Specifications does not exists");
      // }

      coffee.specifications = specifications;

      await this.coffeesRepository.create(coffee);
    });
  }
}

export { CreateCoffeeSpecificationUseCase };
