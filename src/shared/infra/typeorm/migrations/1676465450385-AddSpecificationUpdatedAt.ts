import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSpecificationUpdatedAt1676465450385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "specifications",
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("specifications", "updated_at");
  }
}
