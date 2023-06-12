import { MigrationInterface, QueryRunner } from 'typeorm';

export class RearrangeTblEesMonitoringValidation1686556676137
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IRPortal.dbo.tbl_ees_monitoringvalidation_temp (
                id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
                survey VARCHAR(150),
                exceltitle VARCHAR(150),
                statusprogress VARCHAR(150),
                company VARCHAR(150),
                year VARCHAR(150),
                createdby VARCHAR(150),
                uploadedby VARCHAR(150),
                dateversion VARCHAR(150),
                createdtime DATETIME,
                uploadtime DATETIME,
                createddate VARCHAR(150)
            );
        `);

    await queryRunner.query(`
            SET IDENTITY_INSERT dbo.tbl_ees_monitoringvalidation_temp  ON;

            INSERT INTO dbo.tbl_ees_monitoringvalidation_temp (id, survey, exceltitle, statusprogress, company,
            year, createdby, uploadedby, dateversion, createdtime, uploadtime, createddate) 
            SELECT id, survey, exceltitle, statusprogress, company,
            year, createdby, uploadedby, dateversion, createdtime, uploadtime, createddate FROM dbo.tbl_ees_monitoringvalidation;

            SET IDENTITY_INSERT dbo.tbl_ees_monitoringvalidation_temp OFF;
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
