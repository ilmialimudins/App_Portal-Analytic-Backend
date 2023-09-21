import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableMasterReport1693990558611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ir_masterreport',
        columns: [
          {
            name: 'reportid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'workspaceid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'reportcode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reportname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reportdesc',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reporturl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'reportpowerbiid',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'datasetpowerbiid',
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

    await queryRunner.createForeignKeys('ir_masterreport', [
      new TableForeignKey({
        columnNames: ['workspaceid'],
        referencedTableName: 'ir_masterworkspace',
        referencedColumnNames: ['workspaceid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ir_masterreport');
  }
}
