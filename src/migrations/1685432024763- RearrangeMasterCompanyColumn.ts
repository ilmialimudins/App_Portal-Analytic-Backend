import { MigrationInterface, QueryRunner } from 'typeorm';

export class undefinedearrangeMasterCompanyColumn1685432024763
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IRPortal.dbo.ms_ees_company_temp (
                id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
                companycode VARCHAR(255),
                companyname VARCHAR(255),
                description VARCHAR(255),
                createdtime datetime2 NOT NULL default GETDATE(),
                createddate INT,
                sourcecreatedmodifiedtime datetime2 NOT NULL default GETDATE(),
                sync_date datetime,
                createdby VARCHAR(255),
                updatedby VARCHAR(255)
            )
        `);

    await queryRunner.query(`
      SET IDENTITY_INSERT dbo.ms_ees_company_temp ON;

      INSERT INTO dbo.ms_ees_company_temp (id, companycode, companyname, description, createdtime, createddate, sourcecreatedmodifiedtime, sync_date, createdby, updatedby)
        SELECT id, companycode, companyname, description, createdtime, createddate, sourcecreatedmodifiedtime, sync_date, createdby, updatedby
        FROM dbo.ms_ees_company;
      
      SET IDENTITY_INSERT dbo.ms_ees_company_temp OFF;
      `);

    await queryRunner.query('DROP TABLE IRPortal.dbo.ms_ees_company');

    await queryRunner.query(
      "EXEC IRPortal.sys.sp_rename N'IRPortal.dbo.[dbo.ms_ees_company]', N'ms_ees_company', 'OBJECT';",
    );
  }

  public async down(): Promise<void> {}
}
