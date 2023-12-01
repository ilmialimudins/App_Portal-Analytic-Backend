import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableMPSTrainingHourJobGroup1701156277485
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_mps_traininghourjobgroup',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'propertyid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'jobgroupid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'totalemployee',
            type: 'bigint',
            isNullable: true,
            default: 0,
          },
          {
            name: 'totaltraininghour',
            type: 'bigint',
            isNullable: true,
            default: 0,
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
            name: 'is_sync',
            type: 'int',
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

    await queryRunner.createForeignKeys('tbl_mps_traininghourjobgroup', [
      new TableForeignKey({
        columnNames: ['propertyid'],
        referencedTableName: 'tbl_mps_property',
        referencedColumnNames: ['propertyid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['jobgroupid'],
        referencedTableName: 'ms_mps_jobgroup',
        referencedColumnNames: ['jobgroupid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_mps_traininghourjobgroup');
  }
}
