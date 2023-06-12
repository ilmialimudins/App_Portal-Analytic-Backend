import { MigrationInterface, QueryRunner } from 'typeorm';

export class RearrangeTblEesFactor1686555938421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IRPortal.dbo.tbl_ees_factor_temp (
                id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
                h_factorhashkey VARCHAR(255),
                factorcode VARCHAR(255),
                factorname VARCHAR(255),
                factor_shortname VARCHAR(255),
                category VARCHAR(255),
                label VARCHAR(255),
                d_factorid VARCHAR(255),
                recordsource VARCHAR(255),
                updatedby VARCHAR(255),
                createdby VARCHAR(255),
                sourcecreatedmodifiedtime DATETIME2,
                sync_date DATETIME,
                createdtime DATETIME2 NOT NULL,
                loadenddate DATETIME2
            );
        `);

    await queryRunner.query(`
        SET IDENTITY_INSERT dbo.tbl_ees_factor_temp ON;

        INSERT INTO dbo.tbl_ees_factor_temp (id, h_factorhashkey, factorcode, factorname, factor_shortname, category,
        label, d_factorid, recordsource, updatedby, createdby, sourcecreatedmodifiedtime, sync_date, createdtime, loadenddate) 
        SELECT id, h_factorhashkey, factorcode, factorname, factor_shortname, category,
        label, d_factorid, recordsource, updatedby, createdby, sourcecreatedmodifiedtime, sync_date, createdtime, loadenddate FROM dbo.tbl_ees_factor;

        SET IDENTITY_INSERT dbo.tbl_ees_factor_temp OFF;
      `);

    await queryRunner.query('DROP TABLE IRPortal.dbo.tbl_ees_factor;');

    await queryRunner.query(
      "EXEC IRPortal.sys.sp_rename N'IRPortal.dbo.[tbl_ees_factor_temp]', N'tbl_ees_factor', 'OBJECT';",
    );
  }

  public async down(): Promise<void> {}
}
