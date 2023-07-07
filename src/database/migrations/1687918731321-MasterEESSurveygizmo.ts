import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MasterEESSurveygizmo1687918731321 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_ees_surveygizmo',
        columns: [
          {
            name: 'd_surveygizmoid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'h_surveygizmohashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'surveyid',
            type: 'varchar',
            isNullable: true,
            length: '50',
          },
          {
            name: 'team',
            type: 'varchar',
            isNullable: true,
            length: '50',
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
            length: '50',
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: true,
            length: '50',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
            length: '100',
          },
          {
            name: 'statistics',
            type: 'varchar',
            isNullable: true,
            length: '50',
          },
          {
            name: 'links',
            type: 'varchar',
            isNullable: true,
            length: '350',
          },
          {
            name: 'totalinvitedrespondent',
            type: 'bigint',
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
            name: 'created_on',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'modified_on',
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
    await queryRunner.dropTable('ms_ees_surveygizmo');
  }
}
