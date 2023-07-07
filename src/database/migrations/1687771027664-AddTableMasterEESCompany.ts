import {
  CreateDateColumn,
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class AddTableMasterEESCompany1687771027664
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_ees_company',
        columns: [
          {
            name: 'd_companyid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'h_companyhashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyname_alias',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companygroup',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'modeling_type',
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
    await queryRunner.dropTable('ms_ees_company');
  }
}
