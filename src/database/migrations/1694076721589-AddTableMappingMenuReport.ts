import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableMappingMenuReport1693992031245
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ir_mappingmenureport',
        columns: [
          {
            name: 'mappingmenureportid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'menuid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'reportid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'sectionid',
            type: 'bigint',
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
    await queryRunner.createForeignKeys('ir_mappingmenureport', [
      new TableForeignKey({
        columnNames: ['menuid'],
        referencedTableName: 'ir_mastermenu',
        referencedColumnNames: ['menuid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['reportid'],
        referencedTableName: 'ir_masterreport',
        referencedColumnNames: ['reportid'],
      }),
      new TableForeignKey({
        columnNames: ['sectionid'],
        referencedTableName: 'ir_mastersection',
        referencedColumnNames: ['sectionid'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ir_mappingmenureport');
  }
}
