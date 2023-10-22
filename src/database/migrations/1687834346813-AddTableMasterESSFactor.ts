import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableMasterESSFactor1687834346813
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_ees_factor',
        columns: [
          {
            name: 'factorid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'h_factorhashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'factorcode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'factorname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'factor_shortname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'label',
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
    await queryRunner.dropTable('ms_ees_factor');
  }
}
