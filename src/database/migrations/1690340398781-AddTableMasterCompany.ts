import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableMasterCompany1690340398781 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ms_company',
        columns: [
          {
            name: 'companyid',
            type: 'bigint',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'businesslineid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'businessgroupid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'surveygroupid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'locationid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'ownershipstatusid',
            type: 'bigint',
            isNullable: true,
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
            name: 'modellingtypeid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'companycode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyeesname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companympsname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'aliascompany1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'aliascompany2',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'aliascompany3',
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
    await queryRunner.createForeignKeys('ms_company', [
      new TableForeignKey({
        columnNames: ['businesslineid'],
        referencedTableName: 'ms_businessline',
        referencedColumnNames: ['businesslineid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['businessgroupid'],
        referencedTableName: 'ms_businessgroup',
        referencedColumnNames: ['businessgroupid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['surveygroupid'],
        referencedTableName: 'ms_surveygroup',
        referencedColumnNames: ['surveygroupid'],
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
        columnNames: ['ownershipstatusid'],
        referencedTableName: 'ms_ownershipstatus',
        referencedColumnNames: ['ownershipstatusid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
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
        columnNames: ['modellingtypeid'],
        referencedTableName: 'ms_modellingtype',
        referencedColumnNames: ['modellingtypeid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ms_company');
  }
}
