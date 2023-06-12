import { MigrationInterface, QueryRunner } from 'typeorm';

export class RearrangeTblEesValidateSurveyResult1686557391064
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IRPortal.dbo.tbl_ees_validatesurveyresult_temp (
                id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
                businessline VARCHAR(100),
                division VARCHAR(100),
                company VARCHAR(100),
                department VARCHAR(100),
                excelname VARCHAR(100),
                serviceyears VARCHAR(100),
                respondentid VARCHAR(100),
                startworkdate VARCHAR(100),
                branch VARCHAR(100),
                education VARCHAR(100),
                serviceyearscode VARCHAR(100),
                birthyear VARCHAR(100),
                dateversion VARCHAR(100),
                agegroup VARCHAR(100),
                businesslinecode VARCHAR(100),
                grade VARCHAR(100),
                sourcecreatedmodifiedby VARCHAR(100),
                jobtitle VARCHAR(100),
                tahunmasuk_astra VARCHAR(100),
                agegroupcode VARCHAR(100),
                directorate VARCHAR(100),
                datesubmitted VARCHAR(100),
                surveyid VARCHAR(100),
                location VARCHAR(100),
                agegeneration VARCHAR(100),
                createdby VARCHAR(100),
                sourcecreatedmodifiedtime DATETIME,
                createdtime DATETIME
            );
        `);

    await queryRunner.query(`
        SET IDENTITY_INSERT dbo.tbl_ees_validatesurveyresult_temp  ON;

        INSERT INTO dbo.tbl_ees_validatesurveyresult_temp (id, businessline, division, company, department, excelname, serviceyears,
        respondentid, startworkdate, branch, education, serviceyearscode, birthyear, dateversion, agegroup,
        businesslinecode, grade, sourcecreatedmodifiedby, jobtitle, tahunmasuk_astra, agegroupcode, directorate,
        datesubmitted, surveyid, location, agegeneration, createdby, sourcecreatedmodifiedtime, createdtime)

        SELECT id, businessline, division, company, department, excelname, serviceyears,
        respondentid, startworkdate, branch, education, serviceyearscode, birthyear, dateversion, agegroup,
        businesslinecode, grade, sourcecreatedmodifiedby, jobtitle, tahunmasuk_astra, agegroupcode, directorate,
        datesubmitted, surveyid, location, agegeneration, createdby, sourcecreatedmodifiedtime, createdtime FROM dbo.tbl_ees_validatesurveyresult;

        SET IDENTITY_INSERT dbo.tbl_ees_validatesurveyresult_temp OFF;
      `);

    await queryRunner.query(
      'DROP TABLE IRPortal.dbo.tbl_ees_monitoringvalidation;',
    );

    await queryRunner.query(
      "EXEC IRPortal.sys.sp_rename N'IRPortal.dbo.[tbl_ees_monitoringvalidation_temp]', N'tbl_ees_monitoringvalidation', 'OBJECT';",
    );
  }

  public async down(): Promise<void> {}
}
