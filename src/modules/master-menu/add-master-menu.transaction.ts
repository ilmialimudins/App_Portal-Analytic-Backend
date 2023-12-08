import { BaseTransaction } from 'src/common/abstract.transaction';
import { DataSource, EntityManager } from 'typeorm';
import { MappingMenuReport } from '../mapping-menu-report/mapping-menu-report.entity';
import { AddMasterMenuDto } from './dto/add-master-menu.dto';
import { ListMenuDTO } from './dto/maintain-mastermenu.dto';
import { MasterMenu } from './master-menu.entity';

export class AddMasterMenuTransaction extends BaseTransaction<
  AddMasterMenuDto,
  ListMenuDTO
> {
  constructor(private dataSource: DataSource) {
    super(dataSource);
  }

  protected async execute(
    data: AddMasterMenuDto,
    manager: EntityManager,
  ): Promise<ListMenuDTO> {
    const masterMenuRepo = manager.getRepository(MasterMenu);

    const masterMenu = masterMenuRepo.create({
      menuname: data.menuname,
      parentid: data.parentid,
      sequence: data.sequence,
      menucode: data.menucode || '',
      url: data.url,
      issection: data.issection,
      isdelete: 'false',
      createdtime: new Date(),
      sourcecreatedmodifiedtime: new Date(),
      createdby: this.metadata.userinfo?.username || 'System-Inject',
    });
    const newMenu = await masterMenuRepo.save(masterMenu);

    if (data.issection && data.reportid && data.sectionid) {
      const mappingMenuReportRepo = manager.getRepository(MappingMenuReport);

      const newMenuReport = await mappingMenuReportRepo.save(
        mappingMenuReportRepo.create({
          menuid: newMenu.menuid,
          reportid: data.reportid,
          sectionid: data.sectionid,
          isdelete: 'false',
          createdby: this.metadata.userinfo?.fullname || 'System-Insert',
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        }),
      );

      console.log('successfully create menureport', newMenuReport);
    }

    return newMenu;
  }
}
