import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableMPSGradeEmployeeStatus1701153429198
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_mps_gradeemployeestatus',
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
            name: 'gradeid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'propertyid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'employeestatusid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'genderid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'total',
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

    await queryRunner.createForeignKeys('tbl_mps_gradeemployeestatus', [
      new TableForeignKey({
        columnNames: ['gradeid'],
        referencedTableName: 'ms_mps_grade',
        referencedColumnNames: ['gradeid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['propertyid'],
        referencedTableName: 'tbl_mps_property',
        referencedColumnNames: ['propertyid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['genderid'],
        referencedTableName: 'ms_mps_gender',
        referencedColumnNames: ['genderid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_mps_gradeemployeestatus');
  }
}
