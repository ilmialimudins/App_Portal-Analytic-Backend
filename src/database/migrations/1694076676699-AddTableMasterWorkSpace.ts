import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableMasterWorkSpace1693990022387
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ir_masterworkspace',
        columns: [
          {
            name: 'workspaceid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'workspacecode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'workspacename',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'workspacedesc',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'workspacepowerbiid',
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
    await queryRunner.dropTable('ir_masterworkspace');
  }
}
