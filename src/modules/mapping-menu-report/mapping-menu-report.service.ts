import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MappingMenuReport } from './mapping-menu-report.entity';
import { Repository } from 'typeorm';
import { MappingMenuReportDto } from './dto/mapping-menu-report.dto';
import { AddMappingMenuReportDto } from './dto/add-mapping-menu-report.dto';
import { UpdateMappingMenuReportDto } from './dto/update-mapping-menu-report.dto';

@Injectable()
export class MappingMenuReportService {
  constructor(
    @InjectRepository(MappingMenuReport)
    private mappingMenuReportRepository: Repository<MappingMenuReport>,
  ) {}

  public getMainRepo() {
    return this.mappingMenuReportRepository;
  }
  async getAllMappingMenuReport() {
    try {
      const data = await this.mappingMenuReportRepository
        .createQueryBuilder('mappingmenureport')
        .leftJoin('mappingmenureport.mastermenu', 'mastermenu')
        .leftJoin('mappingmenureport.masterreport', 'masterreport')
        .leftJoin('mappingmenureport.mastersection', 'mastersection')
        .select([
          'mappingmenureport.mappingmenureportid',
          'mastermenu.menuname',
          'masterreport.reportname',
          'mastersection.sectionname',
        ])
        .where('mappingmenureport.isdelete = :isdelete', { isdelete: false })
        .getRawMany();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getMappingMenuReportId(
    mappingmenureportid: number,
  ): Promise<MappingMenuReportDto | undefined> {
    try {
      const query = await this.mappingMenuReportRepository
        .createQueryBuilder('mappingmenureport')
        .where('mappingmenureport.mappingmenureportid = :mappingmenureportid', {
          mappingmenureportid: mappingmenureportid,
        })
        .getOne();

      return query?.toDto();
    } catch (error) {
      throw error;
    }
  }

  async createMappingMenuReport(mappingmenureport: AddMappingMenuReportDto) {
    try {
      const query = this.mappingMenuReportRepository
        .createQueryBuilder('mappingmenureport')
        .insert()
        .into(MappingMenuReport)
        .values({
          menuid: mappingmenureport.menuid,
          reportid: mappingmenureport.reportid,
          sectionid: mappingmenureport.sectionid,
          createdby: mappingmenureport.createdby,
          isdelete: 'false',
          createdtime: new Date(),
          sourcecreatedmodifiedtime: new Date(),
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async updateMappingMenuReport(
    mappingmenureportid: number,
    mappingmenureport: UpdateMappingMenuReportDto,
  ) {
    try {
      const query = await this.mappingMenuReportRepository
        .createQueryBuilder()
        .update(MappingMenuReport)
        .set({
          menuid: mappingmenureport.menuid,
          reportid: mappingmenureport.reportid,
          sectionid: mappingmenureport.sectionid,
          createdby: mappingmenureport.createdby,
        })
        .where('mappingmenureportid = :mappingmenureportid', {
          mappingmenureportid,
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async deleteMappingMenuReport(mappingmenureportid: number) {
    try {
      const query = await this.mappingMenuReportRepository
        .createQueryBuilder()
        .update(MappingMenuReport)
        .set({ isdelete: 'true' })
        .where('mappingmenureportid = :mappingmenureportid', {
          mappingmenureportid,
        })
        .execute();

      return query;
    } catch (error) {
      throw error;
    }
  }

  async getMenuReportByMenuCode(menuCode: string) {
    try {
      const data = await this.mappingMenuReportRepository.find({
        relations: {
          masterreport: {
            masterworkspace: true,
          },
          mastermenu: true,
          mastersection: true,
        },

        select: {
          menuid: true,
          mastermenu: {
            menucode: true,
            menuname: true,
          },
          reportid: true,
          masterreport: {
            reportname: true,
            reportpowerbiiid: true,
            datasetpowerbiid: true,
            masterworkspace: {
              workspacepowerbiid: true,
            },
          },
          mastersection: {
            sectionname: true,
            sectioncodepowerbiid: true,
          },
        },

        where: {
          mastermenu: {
            menucode: menuCode,
          },
          isdelete: 'false',
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async getOneMenuReportByMenuID(menuid: number) {
    try {
      const result = await this.mappingMenuReportRepository.findOne({
        where: {
          menuid: menuid,
          isdelete: 'false',
        },
        relations: {
          masterreport: {
            masterworkspace: true,
          },
          mastersection: true,
          mastermenu: true,
        },
        select: {
          mastermenu: {
            menuname: true,
            url: true,
          },
          masterreport: {
            reportpowerbiiid: true,
            masterworkspace: {
              workspacepowerbiid: true,
            },
            datasetpowerbiid: true,
            mastersection: {
              sectioncodepowerbiid: true,
              sectionname: true,
            },
          },
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
