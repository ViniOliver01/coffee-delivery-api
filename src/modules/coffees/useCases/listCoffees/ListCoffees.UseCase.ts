import { inject, injectable } from "tsyringe";
import { Coffee } from "../../infra/typeorm/entities/Coffee";
import { CoffeeMap } from "../../mapper/CoffeeMap";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";

@injectable()
class ListCoffeesUseCase {
  constructor(
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository
  ) {}

  async execute(): Promise<Coffee[]> {
    const coffees = await this.coffeesRepository.listAllCoffees();

    const coffeeList = coffees.map((coffee) => {
      return CoffeeMap.toDTO(coffee);
    });

    return coffeeList;
  }
}

export { ListCoffeesUseCase };
