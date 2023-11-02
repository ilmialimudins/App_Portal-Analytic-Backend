import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddTableSPMInvitedRespondents1690874049939
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_spm_invitedrespondents',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'surveyid',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'companyid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'surveygroupid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'startsurvey',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'closesurvey',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'totalinvited_company',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'demographyid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'valuedemography',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'totalinvited_demography',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'createdby',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sync_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'is_sync',
            type: 'int',
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
            name: 'endcreatedtime',
            type: 'datetime2',
          },
          {
            name: 'sourcecreatedmodifiedtime',
            type: 'datetime2',
            isNullable: true,
          },
          {
            name: 'tahun_survey',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'is_delete',
            type: 'varchar',
            length: '1',
            isNullable: false,
            default: '0',
          },
          {
            name: 'createddate',
            type: 'bigint',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('tbl_spm_invitedrespondents', [
      new TableForeignKey({
        columnNames: ['companyid'],
        referencedTableName: 'ms_company',
        referencedColumnNames: ['companyid'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['surveygroupid'],
        referencedTableName: 'ms_surveygroup',
        referencedColumnNames: ['surveygroupid'],
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_spm_invitedrespondents');
  }
}
