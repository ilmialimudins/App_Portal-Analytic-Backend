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
                syncdate datetime,
                createdby VARCHAR(255),
                updatedby VARCHAR(255)
            )
        `);

    await queryRunner.query(
      `INSERT INTO IRPortal.dbo.ms_ees_company_temp SELECT * FROM IRPortal.dbo.ms_ees_company;`,
    );

    await queryRunner.query('DROP TABLE IRPortal.dbo.ms_ees_company');

    await queryRunner.query(
      'EXEC sp_rename IRPortal.dbo.ms_ees_company_temp, IRPortal.dbo.ms_ees_company',
    );
  }

  public async down(): Promise<void> {}
}
