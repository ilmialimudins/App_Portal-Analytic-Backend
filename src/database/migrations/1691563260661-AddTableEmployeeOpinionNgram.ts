import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableEmployeeOpinionNgram1691563260661
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_employeeopinionngram',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'tahun_survey',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'h_companyhashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'h_surveygizmohashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'h_surveyquestionhashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'h_wordhashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qcode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'word',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'n',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ngram',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ngramfrequency',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'wordrank',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'isDelete',
            type: 'varchar',
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
    await queryRunner.dropTable('tbl_employeeopinionngram');
  }
}
