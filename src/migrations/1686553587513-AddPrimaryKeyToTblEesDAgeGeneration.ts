import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimaryKeyToTblEesDAgeGeneration1686553587513
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_ees_d_agegeneration  
            ALTER COLUMN d_agegenerationid BIGINT NOT NULL;
        `);

    await queryRunner.query(
      `ALTER TABLE dbo.tbl_ees_d_agegeneration 
        ADD PRIMARY KEY(d_agegenerationid);`,
    );
  }

  public async down(): Promise<void> {}
}
