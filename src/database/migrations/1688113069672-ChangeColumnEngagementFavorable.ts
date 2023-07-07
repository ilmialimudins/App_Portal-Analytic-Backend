/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeColumnEngagementFavorable1688113069672
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tbl_pred_engagementfavorable');

    const currentColumn = table?.findColumnByName('iscurrentsurvey')!;

    const changeColumn = currentColumn.clone();
    changeColumn.type = 'varchar';

    await queryRunner.changeColumn(table!, currentColumn, changeColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tbl_pred_engageemntfavorable');

    const currentColumn = table?.findColumnByName('iscurrentsurvey')!;

    const changeColumn = currentColumn.clone();
    changeColumn.type = 'tinyint';

    await queryRunner.changeColumn(table!, currentColumn, changeColumn);
  }
}
