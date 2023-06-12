import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimaryKeyToTblEesDServiceYears1686553738914
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_ees_d_serviceyears
            ADD PRIMARY KEY(d_serviceyearsid);
        `);
  }

  public async down(): Promise<void> {}
}
