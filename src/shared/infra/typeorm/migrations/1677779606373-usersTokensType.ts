import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class usersTokensType1677779606373 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users_tokens",
      new TableColumn({
        name: "type",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users_tokens", "types");
  }
}
