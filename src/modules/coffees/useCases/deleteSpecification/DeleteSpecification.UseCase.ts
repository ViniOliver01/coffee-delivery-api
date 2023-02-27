import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

@injectable()
class DeleteSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.specificationsRepository.delete(id);
  }
}

export { DeleteSpecificationUseCase };
