import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

interface IRequest {
  coffee_id: string;
  specifications_ids: string[];
}

@injectable()
class CreateCoffeeSpecificationUseCase {
  constructor(
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ coffee_id, specifications_ids }: IRequest): Promise<void> {
    const coffee = await this.coffeesRepository.findById(coffee_id);

    if (!coffee) {
      throw new AppError("Café não encontrado");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_ids
    );

    if (specifications.length === 0) {
      throw new AppError("Especificação não encontrada");
    }

    coffee.specifications = specifications;

    await this.coffeesRepository.create(coffee);
  }
}

export { CreateCoffeeSpecificationUseCase };
