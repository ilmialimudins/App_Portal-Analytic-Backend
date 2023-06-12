import { MigrationInterface, QueryRunner } from 'typeorm';

export class RearrangePredPredictionEngagementColumn1686303226164
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IRPortal.dbo.tbl_pred_predictionengagement_temp (
            id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
            d_surveygizmoid INT,
            d_companyid INT,
            demography VARCHAR(255),
            d_factorid BIGINT,
            d_engagementid BIGINT,
            tahunsurvey INT,
            coefficients FLOAT,
            coefficients_type VARCHAR(255),
            prediction_before FLOAT,
            prediction_after FLOAT,
            sync_date DATETIME,
            is_sync INT,
            is_delete INT,
            createdtime DATETIME2,
            createddate INT,
            sourcecreatedmodifiedtime DATETIME2,
            createdby VARCHAR(255),
            updatedby VARCHAR(255)
        )
    `);

    await queryRunner.query(`
  SET IDENTITY_INSERT dbo.tbl_pred_predictionengagement_temp ON;

  INSERT INTO dbo.tbl_pred_predictionengagement_temp (id, d_surveygizmoid, d_companyid, demography, d_factorid, d_engagementid, tahunsurvey, coefficients, coefficients_type, prediction_before, prediction_after, sync_date, is_sync, is_delete, createdtime, createddate, sourcecreatedmodifiedtime, createdby, updatedby)
    SELECT id, d_surveygizmoid, d_companyid, demography, d_factorid, d_engagementid, tahunsurvey, coefficients, coefficients_type, prediction_before, prediction_after, sync_date, is_sync, is_delete, createdtime, createddate, sourcecreatedmodifiedtime, createdby, updatedby
    FROM dbo.tbl_pred_predictionengagement;
  
  SET IDENTITY_INSERT dbo.tbl_pred_predictionengagement_temp OFF;
  `);

    await queryRunner.query(
      'DROP TABLE IRPortal.dbo.tbl_pred_predictionengagement',
    );

    await queryRunner.query(
      "EXEC IRPortal.sys.sp_rename N'IRPortal.dbo.[tbl_pred_predictionengagement_temp]', N'tbl_pred_predictionengagement', 'OBJECT';",
    );
  }

  public async down(): Promise<void> {}
}
