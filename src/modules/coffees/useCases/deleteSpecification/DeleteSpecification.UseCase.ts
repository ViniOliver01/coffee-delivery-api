import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

@injectable()
class DeleteSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const spec = await this.specificationsRepository.findById(id);

    if (!spec) {
      throw new AppError("Especificação não encontrada");
    }

    await this.specificationsRepository.delete(id);
  }
}

export { DeleteSpecificationUseCase };
