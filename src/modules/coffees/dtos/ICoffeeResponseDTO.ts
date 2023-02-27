import { Specification } from "../infra/typeorm/entities/Specification";

interface ICoffeeResponseDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
  image_url(): string;
  specifications: Specification[];
  updated_at: Date;
  created_at: Date;
}

export { ICoffeeResponseDTO };
