import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class PredEngagementValue1687937482391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_pred_engagementvalue',
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
            name: 'demography',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'demographyvalue',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tahunsurvey',
            type: 'int',
            isNullable: true,
          },

          {
            name: 'avg_respondentanswer_before',
            type: 'float',
            isNullable: true,
            length: '53',
          },
          {
            name: 'avg_respondentanswer_after',
            type: 'float',
            isNullable: true,
            length: '53',
          },
          {
            name: 'count_respondent',
            type: 'bigint',
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

    await queryRunner.createForeignKey(
      'tbl_pred_engagementvalue',
      new TableForeignKey({
        columnNames: ['d_surveygizmoid'],
        referencedColumnNames: ['d_surveygizmoid'],
        referencedTableName: 'ms_ees_surveygizmo',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_engagementvalue',
      new TableForeignKey({
        columnNames: ['d_companyid'],
        referencedColumnNames: ['d_companyid'],
        referencedTableName: 'ms_ees_company',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_engagementvalue',
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
