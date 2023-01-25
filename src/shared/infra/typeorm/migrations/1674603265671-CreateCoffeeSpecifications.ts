import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCoffeeSpecifications1674603265671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications_coffee",
        columns: [
          {
            name: "coffee_id",
            type: "uuid",
          },
          {
            name: "specification_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "specifications_coffee",
      new TableForeignKey({
        name: "FKSpecificationCoffee",
        referencedTableName: "specifications",
        referencedColumnNames: ["id"],
        columnNames: ["specification_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
    await queryRunner.createForeignKey(
      "specifications_coffee",
      new TableForeignKey({
        name: "FKCoffeeSpecification",
        referencedTableName: "coffees",
        referencedColumnNames: ["id"],
        columnNames: ["coffee_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("specifications_coffee", "FKCoffeeSpecification");
    await queryRunner.dropForeignKey("specifications_coffee", "FKSpecificationCoffee");
    await queryRunner.dropTable("specifications_coffee");
  }
}
