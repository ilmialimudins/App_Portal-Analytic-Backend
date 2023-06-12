import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimaryKeyToTblPredRelativeImportance1686554846503
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_pred_relativeimportance 
            ADD id INT IDENTITY;
        `);

    await queryRunner.query(`
            ALTER TABLE dbo.tbl_pred_relativeimportance
            ADD CONSTRAINT PK_PredRelativeImportance
            PRIMARY KEY(id);
        `);
  }

  public async down(): Promise<void> {}
}
