import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableMasterEESEngagement1687847096543
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_ees_engagement',
        columns: [
          {
            name: 'd_engagementid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'h_engagementhashkey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'engagement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'engagement_shortname',
            type: 'varchar',
            isNullable: true,
            length: '500',
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
    await queryRunner.dropTable('ms_ees_engagement');
  }
}
