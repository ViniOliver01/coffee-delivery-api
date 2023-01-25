import { Specification } from "../../infra/typeorm/entities/Specification";

interface ISpecificationsRepository {
  create(name: string): Promise<void>;
  findByIds(ids: string[]): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  listAll(): Promise<Specification[]>;
}

export { ISpecificationsRepository };
