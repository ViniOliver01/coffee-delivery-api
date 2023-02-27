import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as UUIDv4 } from "uuid";

@Entity("specifications")
class Specification {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @CreateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = UUIDv4();
    }
  }
}

export { Specification };
