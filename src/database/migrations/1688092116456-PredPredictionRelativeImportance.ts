import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class PredPredictionRelativeImportance1688092116456
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_pred_relativeimportance',
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
            name: 'd_surveygizmoid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'd_companyid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'd_factorid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'd_engagementid',
            type: 'bigint',
            isNullable: false,
          },

          {
            name: 'tahunsurvey',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'relativeimportance',
            type: 'float',
            isNullable: true,
            length: '53',
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

    await queryRunner.createForeignKey(
      'tbl_pred_relativeimportance',
      new TableForeignKey({
        columnNames: ['d_surveygizmoid'],
        referencedColumnNames: ['d_surveygizmoid'],
        referencedTableName: 'ms_ees_surveygizmo',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_relativeimportance',
      new TableForeignKey({
        columnNames: ['d_engagementid'],
        referencedColumnNames: ['d_engagementid'],
        referencedTableName: 'ms_ees_engagement',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_relativeimportance',
      new TableForeignKey({
        columnNames: ['d_companyid'],
        referencedColumnNames: ['d_companyid'],
        referencedTableName: 'ms_ees_company',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_relativeimportance',
      new TableForeignKey({
        columnNames: ['d_factorid'],
        referencedColumnNames: ['d_factorid'],
        referencedTableName: 'ms_ees_factor',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
