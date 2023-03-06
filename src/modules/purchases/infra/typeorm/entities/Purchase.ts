import ShortUniqueId from "short-unique-id";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as UUIDv4 } from "uuid";
import { User } from "../../../../accounts/infra/typeorm/entities/User";
import { IPurchaseCart } from "../../../dtos/IPurchaseCart";

const generate = new ShortUniqueId({ length: 10, dictionary: "number" });
const uid = String(generate()).toUpperCase();

@Entity("purchases")
class Purchase {
  @PrimaryColumn()
  id: string;

  @Column()
  purchase_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  address_id: string;

  @Column("jsonb")
  cart: IPurchaseCart[];

  @Column()
  products_value: number;

  @Column()
  delivery_value: number;

  @Column()
  total_value: number;

  @Column()
  status: string;

  @Column()
  payment_type: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = UUIDv4();
      this.purchase_id = uid;
      this.status = "Pedido Realizado";
    }
  }
}

export { Purchase };
