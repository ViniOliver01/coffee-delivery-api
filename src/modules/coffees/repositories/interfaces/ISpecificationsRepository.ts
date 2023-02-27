import { Specification } from "../../infra/typeorm/entities/Specification";

interface ISpecificationsRepository {
  create(name: string, id?: string): Promise<void>;
  findByIds(ids: string[]): Promise<Specification[]>;
  findById(id: string): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  listAll(): Promise<Specification[]>;
  delete(id: string): Promise<void>;
}

export { ISpecificationsRepository };
