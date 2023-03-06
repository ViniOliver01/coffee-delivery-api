import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class updatedUserAddressForeignKey1678130056595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "users_address",
      new TableForeignKey({
        name: "FKUserAddress",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users_address", "FKUserAddress");
  }
}
