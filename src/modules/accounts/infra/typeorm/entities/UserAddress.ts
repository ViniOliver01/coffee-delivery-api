import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as UUIDv4 } from "uuid";

@Entity("users_address")
class UserAddress {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = UUIDv4();
    }
  }
}
export { UserAddress };
