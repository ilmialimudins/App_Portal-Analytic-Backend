import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableDemography1690352149335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_demography',
        columns: [
          {
            name: 'demographyid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'demographycode',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'demographydesc',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'demographyalias',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'urutanfilter',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'desc',
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
            isNullable: true,
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
    await queryRunner.dropTable('ms_demography');
  }
}
