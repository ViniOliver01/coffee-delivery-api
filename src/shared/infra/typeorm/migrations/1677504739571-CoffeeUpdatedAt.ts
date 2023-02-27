import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CoffeeUpdatedAt1677504739571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "coffees",
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("coffees", "updated_at");
  }
}
