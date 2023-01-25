import { inject, injectable } from "tsyringe";
import { ICreateCoffeeDTO } from "../../dtos/ICreateCoffeeDTO";
import { Coffee } from "../../infra/typeorm/entities/Coffee";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";

@injectable()
class CreateCoffeeUseCase {
  constructor(
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository
  ) {}

  async execute({ name, description, price }: ICreateCoffeeDTO): Promise<Coffee> {
    const response = await this.coffeesRepository.create({ name, description, price });

    return response;
  }
}

export { CreateCoffeeUseCase };
