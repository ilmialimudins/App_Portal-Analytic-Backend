import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableMonitoringValidation1696993500969
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_monitoringvalidation',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uploadby',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'uploadtime',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'statusprogress',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'exceltitle',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'company',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'year',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'surveytitle',
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('monitoringvalidation');
  }
}
