import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableValidateSurveyResult1696991219412
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tbl_validatesurveyresult',
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
            name: 'uuid',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'excelname',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'validation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dateversion',
            type: 'datetime2',
            isNullable: true,
          },
          {
            name: 'surveyid',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'respondentid',
            type: 'bigint',
            isNullable: false,
          },
          {
            name: 'businesslinecode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'businessline',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'company',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'division',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'department',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'branch',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'directorate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'education',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'grade',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'jobtitle',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'locationname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'age',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'agegeneration',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'agegroupcode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'agegroup',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'serviceyearscode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'serviceyears',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'region',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'area',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'plant',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'kebun',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'jobsites',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'statuskaryawan',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'functionname',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'salesoffice',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'latest',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'tahunlahir',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tahunmasuk_perusahaan',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tahunmasuk_astra',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'tahunsurvey',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'entryyear_difference',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fillingtime',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'similaranswer',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'completeanswer',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'age_this_year',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'age_when_entering_company',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'excel_username',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'row_status',
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('validatesurveyresult');
  }
}
