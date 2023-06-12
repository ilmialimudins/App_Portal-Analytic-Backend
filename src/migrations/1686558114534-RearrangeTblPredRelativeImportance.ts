import { MigrationInterface, QueryRunner } from 'typeorm';

export class RearrangeTblPredRelativeImportance1686558114534
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IRPortal.dbo.tbl_pred_relativeimportance_temp (
                id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
                d_surveygizmoid BIGINT,
                d_companyid BIGINT,
                d_engagementid BIGINT,
                tahunsurvey VARCHAR(255),
                d_factorid BIGINT,
                relativeimportance FLOAT,
                createdby VARCHAR(255),
                createdtime DATETIME,
                sourcecreatedmodifiedtime DATETIME,
                createddate BIGINT,
                sync_date DATETIME,
                is_sync INT,
                is_delete INT
            );
        `);

    await queryRunner.query(`
            SET IDENTITY_INSERT dbo.tbl_pred_relativeimportance_temp  ON;

            INSERT INTO dbo.tbl_pred_relativeimportance_temp (id, d_surveygizmoid, d_companyid,
            d_engagementid, tahunsurvey, d_factorid, relativeimportance, createdby,
            createdtime, sourcecreatedmodifiedtime, createddate, sync_date, is_sync, is_delete)

            SELECT id, d_surveygizmoid, d_companyid,
            d_engagementid, tahunsurvey, d_factorid, relativeimportance, createdby,
            createdtime, sourcecreatedmodifiedtime, createddate, sync_date, is_sync, is_delete FROM dbo.tbl_pred_relativeimportance;

            SET IDENTITY_INSERT dbo.tbl_pred_relativeimportance_temp OFF;
      `);

    await queryRunner.query(
      'DROP TABLE IRPortal.dbo.tbl_pred_relativeimportance;',
    );

    await queryRunner.query(
      "EXEC IRPortal.sys.sp_rename N'IRPortal.dbo.[tbl_pred_relativeimportance_temp]', N'tbl_pred_relativeimportance', 'OBJECT';",
    );
  }

  public async down(): Promise<void> {}
}
