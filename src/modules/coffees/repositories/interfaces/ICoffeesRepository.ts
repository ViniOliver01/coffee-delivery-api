import { ICreateCoffeeDTO } from "../../dtos/ICreateCoffeeDTO";
import { Coffee } from "../../infra/typeorm/entities/Coffee";

interface ICoffeesRepository {
  create(data: ICreateCoffeeDTO): Promise<Coffee>;
  findById(id: string): Promise<Coffee>;
  findByName(name: string): Promise<Coffee>;
  listAllCoffees(): Promise<Coffee[]>;
  listAvailableCoffees(): Promise<Coffee[]>;
  updateAvailableCoffeesById(id: string, available: boolean): Promise<void>;
  delete(id: string): Promise<void>;
}

export { ICoffeesRepository };
