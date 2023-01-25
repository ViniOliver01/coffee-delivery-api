import { inject, injectable } from "tsyringe";
import { Coffee } from "../../infra/typeorm/entities/Coffee";
import { ISpecificationsRepository } from "../../repositories/interfaces/ISpecificationsRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Coffee[]> {
    const specifications = await this.specificationsRepository.listAll();

    return specifications;
  }
}

export { ListSpecificationsUseCase };
