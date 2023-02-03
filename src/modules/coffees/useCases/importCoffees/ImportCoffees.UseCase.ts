import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";

interface IImportCoffee {
  name: string;
  description: string;
  price: number;
}

@injectable()
class ImportCoffeesUseCase {
  constructor(
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository
  ) {}

  async loadCoffees(file: Express.Multer.File): Promise<IImportCoffee[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCoffee[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description, price] = line;
          categories.push({
            name,
            description,
            price,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const coffees = await this.loadCoffees(file);

    coffees.map(async (coffee) => {
      const { name, description, price } = coffee;

      const coffeeAlreadyExists = await this.coffeesRepository.findByName(name);

      if (!coffeeAlreadyExists) {
        await this.coffeesRepository.create({
          name,
          description,
          price,
        });
      }
    });
  }
}

export { ImportCoffeesUseCase };
