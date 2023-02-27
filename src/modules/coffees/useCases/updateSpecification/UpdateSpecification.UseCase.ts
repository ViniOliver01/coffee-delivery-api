import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

@injectable()
class UpdateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(name: string, id?: string): Promise<void> {
    name = name.charAt(0).toUpperCase() + name.slice(1); // first character to uppercase

    const specificationId = await this.specificationsRepository.findById(id);
    const specification = await this.specificationsRepository.findByName(name);

    if (!specificationId) {
      throw new AppError("Specification not exists");
    }

    if (specificationId && specification && specification.id !== specificationId.id) {
      throw new AppError("Specification already exists");
    }

    if (!specificationId) {
      throw new AppError("Specification not exists");
    }

    if (specificationId && specification && specificationId.id === specification.id) {
      throw new AppError("Specification not changed");
    }
    await this.specificationsRepository.create(name, id);
  }
}

export { UpdateSpecificationUseCase };
