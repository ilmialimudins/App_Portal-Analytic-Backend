import { TableForeignKey } from 'typeorm';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableEmployeeOpinionNgram1691563260661
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_employeeopinionngram',
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
            name: 'uuid',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'companyid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'surveygizmoid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'qcodeid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'wordid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'tahun_survey',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'n',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'ngram',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ngramfrequency',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'wordrank',
            type: 'int',
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
            name: 'sync_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'is_sync',
            type: 'int',
            default: '0',
            isNullable: true,
          },
          {
            name: 'is_update',
            type: 'int',
            default: '0',
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKeys('tbl_employeeopinionngram', [
      new TableForeignKey({
        columnNames: ['companyid'],
        referencedTableName: 'ms_company',
        referencedColumnNames: ['companyid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['surveygizmoid'],
        referencedTableName: 'ms_ees_surveygizmo',
        referencedColumnNames: ['surveygizmoid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['qcodeid'],
        referencedTableName: 'ms_ees_qcode',
        referencedColumnNames: ['qcodeid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['wordid'],
        referencedTableName: 'ms_ees_word',
        referencedColumnNames: ['wordid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tbl_employeeopinionngram');
  }
}
