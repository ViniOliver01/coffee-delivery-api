import { inject, injectable } from "tsyringe";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";
import { AppError } from "./../../../../shared/errors/AppError";

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
    const coffee = await this.coffeesRepository.findById(id);

    if (!coffee) {
      throw new AppError("Café não encontrado");
    }

    await this.coffeesRepository.create({
      id,
      name,
      description,
      price,
      available,
    });
  }
}

export { UpdateCoffeeDataUseCase };
