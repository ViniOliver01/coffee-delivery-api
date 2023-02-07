import ShortUniqueId from "short-unique-id";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as UUIDv4 } from "uuid";
import { IPurchaseCart } from "../../../dtos/IPurchaseCart";

const generate = new ShortUniqueId({ length: 10, dictionary: "number" });
const uid = String(generate()).toUpperCase();

@Entity("purchases")
class Purchase {
  @PrimaryColumn()
  id: string;

  @Column()
  purchase_id: string;

  @Column()
  user_id: string;

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
