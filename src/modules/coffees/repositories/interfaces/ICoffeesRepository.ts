import { ICreateCoffeeDTO } from "../../dtos/ICreateCoffeeDTO";
import { Coffee } from "../../infra/typeorm/entities/Coffee";

interface ICoffeesRepository {
  create(data: ICreateCoffeeDTO): Promise<Coffee>;
  findById(id: string): Promise<Coffee>;
  findByName(name: string): Promise<Coffee>;
  listAvailableCoffees(): Promise<Coffee[]>;
  updateAvailableCoffeesById(id: string, available: boolean): Promise<void>;
}

export { ICoffeesRepository };
