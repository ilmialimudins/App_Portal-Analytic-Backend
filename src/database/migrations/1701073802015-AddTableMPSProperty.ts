import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableMPSProperty1701073802015 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_mps_property',
        columns: [
          {
            name: 'propertyid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'claid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'directreviewid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'companyid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'locationid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'businessgroupid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'ownershipstatusid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'month',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'year',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'month_date',
            type: 'datetime',
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

    await queryRunner.createForeignKeys('tbl_mps_property', [
      new TableForeignKey({
        columnNames: ['claid'],
        referencedTableName: 'ms_cla',
        referencedColumnNames: ['claid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['directreviewid'],
        referencedTableName: 'ms_directreview',
        referencedColumnNames: ['directreviewid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['locationid'],
        referencedTableName: 'ms_location',
        referencedColumnNames: ['locationid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['companyid'],
        referencedTableName: 'ms_company',
        referencedColumnNames: ['companyid'],
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_mps_property');
  }
}
