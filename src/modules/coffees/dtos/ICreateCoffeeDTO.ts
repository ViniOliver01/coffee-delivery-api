import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCoffeeDTO {
  name: string;
  description: string;
  price: number;
  image?: string;
  specifications?: Specification[];
  id?: string;
}

export { ICreateCoffeeDTO };
