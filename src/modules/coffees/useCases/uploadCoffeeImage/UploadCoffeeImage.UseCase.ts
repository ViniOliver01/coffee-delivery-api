import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { ICoffeesRepository } from "../../repositories/interfaces/ICoffeesRepository";

interface IRequest {
  coffee_id: string;
  image_file: string;
}

@injectable()
class UploadCoffeeImageUseCase {
  constructor(
    @inject("CoffeesRepository")
    private coffeesRepository: ICoffeesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ coffee_id, image_file }: IRequest): Promise<void> {
    const coffee = await this.coffeesRepository.findById(coffee_id);

    if (coffee.image) {
      await this.storageProvider.delete(coffee.image, "coffee");
    }

    await this.storageProvider.save(image_file, "coffee");

    coffee.image = image_file;

    await this.coffeesRepository.create(coffee);
  }
}

export { UploadCoffeeImageUseCase };
