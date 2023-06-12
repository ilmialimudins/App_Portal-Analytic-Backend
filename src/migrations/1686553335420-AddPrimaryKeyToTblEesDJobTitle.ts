import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimaryKeyToTblEesDJobTitle1686553335420
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_ees_d_jobtitle 
            ALTER COLUMN d_jobtitleid BIGINT NOT NULL;
        `);

    await queryRunner.query(
      `ALTER TABLE dbo.tbl_ees_d_jobtitle 
        ADD PRIMARY KEY(d_jobtitleid);`,
    );
  }

  public async down(): Promise<void> {}
}
