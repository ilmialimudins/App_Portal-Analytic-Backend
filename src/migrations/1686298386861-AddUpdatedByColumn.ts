import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUpdatedByColumn1686298386861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_pred_predictionengagement 
	          ADD updatedby VARCHAR(255);
        `);
  }

  public async down(): Promise<void> {}
}
