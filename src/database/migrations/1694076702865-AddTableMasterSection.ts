import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableMasterSection1693991279128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ir_mastersection',
        columns: [
          {
            name: 'sectionid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'reportid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'sectioncode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sectionname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sectiondesc',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sectioncodepowerbiid',
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

    await queryRunner.createForeignKeys('ir_mastersection', [
      new TableForeignKey({
        columnNames: ['reportid'],
        referencedTableName: 'ir_masterreport',
        referencedColumnNames: ['reportid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ir_mastersection');
  }
}
