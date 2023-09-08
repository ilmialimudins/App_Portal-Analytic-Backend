import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableMasterUser1693452023313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ir_masteruser',
        columns: [
          {
            name: 'userid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companycode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phonenumber',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'npk',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ir_masteruser');
  }
}
