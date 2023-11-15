import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableMasterEESQCode1687846715189 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_ees_qcode',
        columns: [
          {
            name: 'qcodeid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'h_qcodehashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qcode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'question',
            type: 'varchar',
            isNullable: true,
            length: '500',
          },
          {
            name: 'surveyquestion_type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'new_qcode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'recordsource',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'loadenddate',
            type: 'datetime',
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
    await queryRunner.dropTable('ms_ees_qcode');
  }
}
