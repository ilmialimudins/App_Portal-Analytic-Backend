import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimaryKeyToTblEesValidateSurveyResult1686554362939
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_ees_validatesurveyresult 
            ADD id INT IDENTITY;
        `);

    await queryRunner.query(`
            ALTER TABLE dbo.tbl_ees_validatesurveyresult
            ADD CONSTRAINT PK_EesValidateSurveyResult
            PRIMARY KEY(id);
        `);
  }

  public async down(): Promise<void> {}
}
