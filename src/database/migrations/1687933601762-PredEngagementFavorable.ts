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
            name: 'iscurrentsurvey',
            type: 'tinyint',
            isNullable: true,
          },
          {
            name: 'tahunsurvey',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'totalcompletedrespondent',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'd_factorid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'd_qcodeid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'count_all_favorabletype',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'percentage_all_favorabletype',
            type: 'float',
            isNullable: true,
            length: '53',
          },
          {
            name: 'favorable_type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'count_respondent',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'avg_per_qcode',
            type: 'float',
            isNullable: true,
            length: '53',
          },
          {
            name: 'avg_per_factor',
            type: 'float',
            isNullable: true,
            length: '53',
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

    await queryRunner.createForeignKey(
      'tbl_pred_engagementfavorable',
      new TableForeignKey({
        columnNames: ['d_surveygizmoid'],
        referencedColumnNames: ['d_surveygizmoid'],
        referencedTableName: 'ms_ees_surveygizmo',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_engagementfavorable',
      new TableForeignKey({
        columnNames: ['d_companyid'],
        referencedColumnNames: ['d_companyid'],
        referencedTableName: 'ms_ees_company',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_engagementfavorable',
      new TableForeignKey({
        columnNames: ['d_factorid'],
        referencedColumnNames: ['d_factorid'],
        referencedTableName: 'ms_ees_factor',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'tbl_pred_engagementfavorable',
      new TableForeignKey({
        columnNames: ['d_qcodeid'],
        referencedColumnNames: ['d_qcodeid'],
        referencedTableName: 'ms_ees_qcode',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
