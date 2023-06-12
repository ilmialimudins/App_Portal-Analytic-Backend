import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimaryKeyToTblPrePredictionEngagement1686554682197
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_pre_prediction_engagement  
            ADD PRIMARY KEY(id);
        `);
  }

  public async down(): Promise<void> {}
}
