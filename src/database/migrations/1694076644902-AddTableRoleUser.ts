import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableRoleUser1693470978025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ir_roleuser',
        columns: [
          {
            name: 'roleuserid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'roleid',
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
    await queryRunner.createForeignKeys('ir_roleuser', [
      new TableForeignKey({
        columnNames: ['roleid'],
        referencedTableName: 'ir_masterrole',
        referencedColumnNames: ['roleid'],
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
    await queryRunner.dropTable('ir_roleuser');
  }
}
