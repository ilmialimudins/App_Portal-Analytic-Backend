import { BaseTransaction } from 'src/common/abstract.transaction';
import { DataSource, EntityManager } from 'typeorm';
import { MappingMenuReport } from '../mapping-menu-report/mapping-menu-report.entity';

import { ListMenuDTO } from './dto/maintain-mastermenu.dto';
import { UpdateMasterMenuDto } from './dto/update-master-menu.dto';
import { MasterMenu } from './master-menu.entity';

export class EditMasterMenuTransaction extends BaseTransaction<
  UpdateMasterMenuDto,
  ListMenuDTO
> {
  constructor(private dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    data: UpdateMasterMenuDto,
    manager: EntityManager,
  ): Promise<ListMenuDTO> {
    const masterMenuRepo = manager.getRepository(MasterMenu);

    const mappingMenuReportRepo = manager.getRepository(MappingMenuReport);
    const menuToUpdate = await masterMenuRepo.findOne({
      where: { menucode: data.menucode },
    });

    const updatedMenu = await masterMenuRepo.save({
      ...menuToUpdate,
      menuname: data.menuname,
      issection: data.issection,
      url: data.url,
      sequence: data.sequence,
      sourcecreatedmodifiedtime: new Date(),
      updatedby: this.metadata.userinfo?.username ?? 'System-Inject',
    });

    console.log('updated menu', updatedMenu);

    // select mapping menu report

    const menuReport = await mappingMenuReportRepo.findOne({
      where: {
        mastermenu: { menucode: data.menucode },
        isdelete: 'false',
      },
    });

    if (data.issection && !menuReport) {
      const newMenuReport = await mappingMenuReportRepo.save(
        mappingMenuReportRepo.create({
          menuid: updatedMenu.menuid,
          reportid: data.reportid,
          sectionid: data.sectionid,
          isdelete: 'false',
          createdby: this.metadata.userinfo?.fullname ?? 'System-Insert',
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        }),
      );

      console.log('successfully create menureport', newMenuReport);
    } else if (data.issection && menuReport) {
      const updatedMenuReport = await mappingMenuReportRepo.save({
        ...menuReport,
        reportid: data.reportid,
        sectionid: data.sectionid,
        sourcecreatedmodifiedtime: new Date(),
        updatedby: this.metadata.userinfo?.username ?? 'System-Inject',
      });

      console.log('successfully update menureport', updatedMenuReport);
    } else if (!data.issection && menuReport) {
      // Delete force menu report using delete query
      await mappingMenuReportRepo.delete({
        menuid: updatedMenu.menuid,
      });

      console.log('successfully delete menureport');
    }

    return updatedMenu;
  }
}
