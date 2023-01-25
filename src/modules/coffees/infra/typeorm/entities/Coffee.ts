import { Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as UUIDv4 } from "uuid";
import { Specification } from "./Specification";

@Entity("coffees")
class Coffee {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_coffee",
    joinColumns: [{ name: "coffee_id" }],
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specifications: Specification[];

  @Column()
  price: number;

  @Column()
  available: boolean;

  @Column()
  image: string;

  @Expose({ name: "image_url" })
  image_url(): string {
    if (this.image == null) {
      return null;
    }
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/coffee/${this.image}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/coffee/${this.image}`;
      default:
        return null;
    }
  }

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = UUIDv4();
      this.available = true;
    }
  }
}

export { Coffee };
