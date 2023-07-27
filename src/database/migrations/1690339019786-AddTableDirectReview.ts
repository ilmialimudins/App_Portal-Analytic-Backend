import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableDirectReview1690339019786 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_directreview',
        columns: [
          {
            name: 'directreviewid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'directreviewcode',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'directreviewdesc',
            type: 'varchar',
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
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ms_directreview');
  }
}
