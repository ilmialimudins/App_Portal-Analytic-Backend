import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class PredEngagementFavorable1687933601762
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_pred_engagementfavorable',
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
            name: 'factorid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'companyid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'surveygizmoid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'qcodeid',
            type: 'bigint',
            isNullable: false,
          },

          {
            name: 'engagementlevel',
            type: 'varchar',
            isNullable: true,
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
            name: 'iscurrentsurvey',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'latest',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sum_unfavorable',
            type: 'bigint',
            isNullable: true,
          },

          {
            name: 'sum_neutral',
            type: 'bigint',
            isNullable: true,
          },

          {
            name: 'sum_favorable',
            type: 'bigint',
            isNullable: true,
          },

          {
            name: 'count_unfavorable',
            type: 'bigint',
            isNullable: true,
          },

          {
            name: 'count_neutral',
            type: 'bigint',
            isNullable: true,
          },

          {
            name: 'count_favorable',
            type: 'bigint',
            isNullable: true,
          },

          {
            name: 'count_respondent',
            type: 'bigint',
            isNullable: true,
          },

          {
            name: 'count_answer',
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
      'tbl_pred_engagementfavorable',
      new TableForeignKey({
        columnNames: ['surveygizmoid'],
        referencedColumnNames: ['surveygizmoid'],
        referencedTableName: 'ms_ees_surveygizmo',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_engagementfavorable',
      new TableForeignKey({
        columnNames: ['companyid'],
        referencedColumnNames: ['companyid'],
        referencedTableName: 'ms_company',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_engagementfavorable',
      new TableForeignKey({
        columnNames: ['factorid'],
        referencedColumnNames: ['factorid'],
        referencedTableName: 'ms_ees_factor',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_engagementfavorable',
      new TableForeignKey({
        columnNames: ['qcodeid'],
        referencedColumnNames: ['qcodeid'],
        referencedTableName: 'ms_ees_qcode',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
