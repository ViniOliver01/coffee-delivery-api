import { instanceToInstance } from "class-transformer";
import { ICoffeeResponseDTO } from "../dtos/ICoffeeResponseDTO";
import { Coffee } from "../infra/typeorm/entities/Coffee";

class CoffeeMap {
  static toDTO({
    id,
    name,
    available,
    description,
    image,
    image_url,
    price,
    specifications,
    created_at,
  }: Coffee): ICoffeeResponseDTO {
    const coffee = instanceToInstance({
      id,
      name,
      available,
      description,
      image,
      image_url,
      price,
      specifications,
      created_at,
    });
    return coffee;
  }
}

export { CoffeeMap };
