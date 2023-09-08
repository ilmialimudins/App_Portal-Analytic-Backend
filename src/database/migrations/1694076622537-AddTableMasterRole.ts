import { query } from 'express';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableMasterRole1693464762337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ir_masterrole',
        columns: [
          {
            name: 'roleid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'rolecode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rolename',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'roledesc',
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ir_masterrole');
  }
}
