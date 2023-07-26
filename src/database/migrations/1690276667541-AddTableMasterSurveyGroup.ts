import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableMasterSurveyGroup1690276667541
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_surveygroup',
        columns: [
          {
            name: 'd_surveygroupid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'h_surveygrouphashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'surveygroupcode',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'surveygroupdesc',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'desc',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'recordsource',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'loadenddate',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'createdby',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updatedby',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdtime',
            type: 'datetime2',
          },
          {
            name: 'createddate',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'sourcecreatedmodifiedtime',
            type: 'datetime2',
            isNullable: true,
          },
          {
            name: 'sync_date',
            type: 'datetime',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ms_surveygroup');
  }
}
