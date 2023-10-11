import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableSurveyValidation1697009980286
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_surveyvalidation',
        columns: [
          {
            name: 'validation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'company',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'surveyid',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'titlesurvey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dateversion',
            type: 'datetime2',
            isNullable: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'validateddate',
            type: 'datetime2',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_surveyvalidation');
  }
}
