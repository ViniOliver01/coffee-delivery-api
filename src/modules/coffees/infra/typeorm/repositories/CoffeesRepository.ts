import { getRepository, Repository } from "typeorm";
import { ICreateCoffeeDTO } from "../../../dtos/ICreateCoffeeDTO";
import { ICoffeesRepository } from "../../../repositories/interfaces/ICoffeesRepository";
import { Coffee } from "../entities/Coffee";
import { Specification } from "../entities/Specification";
import { AppError } from "./../../../../../shared/errors/AppError";

class CoffeesRepository implements ICoffeesRepository {
  private repository: Repository<Coffee>;

  constructor() {
    this.repository = getRepository(Coffee);
  }

  async create({
    name,
    description,
    price,
    image,
    specifications,
    id,
  }: ICreateCoffeeDTO): Promise<Coffee> {
    const isAlreadyExists = await this.repository.findOne({ name });

    if (isAlreadyExists) {
      throw new AppError("Coffee already exists");
    }

    const coffee = this.repository.create({
      name,
      description,
      price,
      image,
      specifications,
      id,
    });
    await this.repository.save(coffee);
    return coffee;
  }
  async findById(id: string): Promise<Coffee> {
    const coffee = this.repository.findOne(id);
    return coffee;
  }
  async findByName(name: string): Promise<Coffee> {
    const coffee = this.repository.findOne({ name });
    return coffee;
  }
  async listAvailableCoffees(): Promise<Coffee[]> {
    const coffees = await this.repository.find({ available: true });

    await Promise.all(
      coffees.map(async (coffee) => {
        const coffeeSpec = (await this.repository
          .createQueryBuilder()
          .relation(Coffee, "specifications")
          .of(coffee)
          .loadMany()) as Specification[];
        coffee.specifications = coffeeSpec;
      })
    );

    return coffees;
  }
  async updateAvailableCoffeesById(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id", { id })
      .execute();
  }
}

export { CoffeesRepository };
