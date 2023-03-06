import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class updatedPurchaseForeignKey1678129709258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "purchases",
      new TableForeignKey({
        name: "FKUserPurchases",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("purchases", "FKUserPurchases");
  }
}
