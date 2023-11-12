import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableMasterModellingType1687834346807
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_modellingtype',
        columns: [
          {
            name: 'modellingtypeid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'modellingtypecode',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'modellingtypedesc',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'desc',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'isdelete',
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
            isNullable: true,
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
    await queryRunner.dropTable('ms_modellingtype');
  }
}
