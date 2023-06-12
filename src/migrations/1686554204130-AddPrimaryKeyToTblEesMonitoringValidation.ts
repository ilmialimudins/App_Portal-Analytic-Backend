import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPrimaryKeyToTblEesMonitoringValidation1686554204130
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE dbo.tbl_ees_monitoringvalidation
            ADD id INT IDENTITY;
        `);

    await queryRunner.query(`
            ALTER TABLE dbo.tbl_ees_monitoringvalidation
            ADD CONSTRAINT PK_EesMonitoringValidation
            PRIMARY KEY(id);
        `);
  }

  public async down(): Promise<void> {}
}
