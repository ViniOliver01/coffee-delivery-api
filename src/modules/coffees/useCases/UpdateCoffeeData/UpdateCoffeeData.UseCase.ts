import { inject, injectable } from "tsyringe";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";

interface IRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
}

@injectable()
class UpdateCoffeeDataUseCase {
  constructor(
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository
  ) {}

  async execute({ id, name, description, price, available }: IRequest): Promise<void> {
    const response = await this.coffeesRepository.create({
      id,
      name,
      description,
      price,
      available,
    });
  }
}

export { UpdateCoffeeDataUseCase };
