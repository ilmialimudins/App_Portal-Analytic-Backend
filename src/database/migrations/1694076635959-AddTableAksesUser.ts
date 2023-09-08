import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableAksesUser1693466585115 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ir_aksesuser',
        columns: [
          {
            name: 'aksesuserid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'companyid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'userid',
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
    await queryRunner.createForeignKeys('ir_aksesuser', [
      new TableForeignKey({
        columnNames: ['companyid'],
        referencedTableName: 'ms_company',
        referencedColumnNames: ['companyid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['userid'],
        referencedTableName: 'ir_masteruser',
        referencedColumnNames: ['userid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ir_aksesuser');
  }
}
