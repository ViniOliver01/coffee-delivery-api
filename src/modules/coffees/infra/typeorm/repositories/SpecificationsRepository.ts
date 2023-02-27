import { getRepository, Repository } from "typeorm";
import { ISpecificationsRepository } from "../../../repositories/interfaces/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create(name: string, id?: string): Promise<void> {
    const updated_at = new Date();
    const specification = this.repository.create({ id, name, updated_at });
    await this.repository.save(specification);
  }

  findById(id: string): Promise<Specification> {
    const specification = this.repository.findOne(id);
    return specification;
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.repository.findByIds(ids);
    return specifications;
  }

  findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name });
    return specification;
  }

  async listAll(): Promise<Specification[]> {
    const specification = await this.repository.createQueryBuilder().getMany();

    return specification;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { SpecificationsRepository };
