import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIdToPredPredictionEngagement1686294751634
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE dbo.tbl_pred_predictionengagement
        ADD id INT IDENTITY;
      `);

    await queryRunner.query(`
        ALTER TABLE dbo.tbl_pred_predictionengagement
        ADD CONSTRAINT PK_PredPredictionEngagement
        PRIMARY KEY(id);
      `);
  }

  public async down(): Promise<void> {}
}
