import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUsers1620742974767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "surveys_users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "varchar",
          },
          {
            name: "survey_id",
            type: "varchar",
          },
          {
            name: "value",
            type: "integer",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUsers",
            referencedTableName: "tb_users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKSurveys", // nome da chava estrangeira
            referencedTableName: "tb_surveys", // referencia do nome da tabela que será relacionada
            referencedColumnNames: ["id"], // referencia da coluna que faráo relacionamento
            columnNames: ["survey_id"], // referencia da coluna dentro da tabela atual que receberá o relacionamento
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("surveys_users");
  }
}
