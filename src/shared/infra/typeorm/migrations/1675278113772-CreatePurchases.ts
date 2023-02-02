import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePurchases1675278113772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "purchases",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "purchase_id",
            type: "varchar",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "cart",
            type: "jsonb",
          },
          {
            name: "products_value",
            type: "integer",
          },
          {
            name: "delivery_value",
            type: "integer",
          },
          {
            name: "total_value",
            type: "integer",
          },
          {
            name: "status",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("purchases");
  }
}
