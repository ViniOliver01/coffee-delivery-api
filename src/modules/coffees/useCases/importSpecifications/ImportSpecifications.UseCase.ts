import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

interface IImportSpecification {
  name: string;
}

@injectable()
class ImportSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async loadSpecifications(file: Express.Multer.File): Promise<IImportSpecification[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportSpecification[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name] = line;
          categories.push({
            name,
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
    const specifications = await this.loadSpecifications(file);

    specifications.map(async (specification) => {
      let { name } = specification;

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      name = capitalizeFirstLetter(name);

      const specificationAlreadyExists = await this.specificationsRepository.findByName(
        name
      );

      if (!specificationAlreadyExists) {
        await this.specificationsRepository.create(name);
      }
    });
  }
}

export { ImportSpecificationsUseCase };
