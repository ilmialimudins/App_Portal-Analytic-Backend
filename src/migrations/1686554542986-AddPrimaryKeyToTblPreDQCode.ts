import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimaryKeyToTblPreDQCode1686554542986
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_pre_d_qcode  
            ADD PRIMARY KEY(d_qcodeid);
        `);
  }

  public async down(): Promise<void> {}
}
