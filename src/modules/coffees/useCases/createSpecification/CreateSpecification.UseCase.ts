import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(name: string): Promise<void> {
    name = name.charAt(0).toUpperCase() + name.slice(1); // first character to uppercase

    const specification = await this.specificationsRepository.findByName(name);

    if (specification) {
      throw new AppError("Specification already exists");
    }

    await this.specificationsRepository.create(name);
  }
}

export { CreateSpecificationUseCase };
