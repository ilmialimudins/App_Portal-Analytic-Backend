import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class PredPredictionEngagement1688091385128
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_pred_predictionengagement',
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
            name: 'surveygizmoid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'companyid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'factorid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'engagementid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'demography',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tahunsurvey',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'coefficients',
            type: 'float',
            isNullable: true,
            length: '53',
          },
          {
            name: 'coefficients_type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'prediction_before',
            type: 'float',
            isNullable: true,
            length: '53',
          },
          {
            name: 'prediction_after',
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
      'tbl_pred_predictionengagement',
      new TableForeignKey({
        columnNames: ['surveygizmoid'],
        referencedColumnNames: ['surveygizmoid'],
        referencedTableName: 'ms_ees_surveygizmo',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_predictionengagement',
      new TableForeignKey({
        columnNames: ['engagementid'],
        referencedColumnNames: ['engagementid'],
        referencedTableName: 'ms_ees_engagement',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_predictionengagement',
      new TableForeignKey({
        columnNames: ['companyid'],
        referencedColumnNames: ['companyid'],
        referencedTableName: 'ms_company',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_predictionengagement',
      new TableForeignKey({
        columnNames: ['factorid'],
        referencedColumnNames: ['factorid'],
        referencedTableName: 'ms_ees_factor',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
