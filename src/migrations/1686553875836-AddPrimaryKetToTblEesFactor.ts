import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimaryKeyToTblEesDServiceYears1686553738914
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_ees_factor
            ADD PRIMARY KEY(id);
        `);
  }

  public async down(): Promise<void> {}
}
