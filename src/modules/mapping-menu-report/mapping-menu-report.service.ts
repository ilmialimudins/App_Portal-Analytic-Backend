import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MappingMenuReport } from './mapping-menu-report.entity';
import { Repository } from 'typeorm';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { MappingMenuReportDto } from './dto/mapping-menu-report.dto';
import { AddMappingMenuReportDto } from './dto/add-mapping-menu-report.dto';
import { UpdateMappingMenuReportDto } from './dto/update-mapping-menu-report.dto';

@Injectable()
export class MappingMenuReportService {
  constructor(
    @InjectRepository(MappingMenuReport)
    private mappingMenuReportRepository: Repository<MappingMenuReport>,
  ) {}

  async getAllMappingMenuReport(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<MappingMenuReportDto>> {
    try {
      const query = this.mappingMenuReportRepository
        .createQueryBuilder('mappingmenureport')
        .leftJoin('mappingmenureport.mastermenu', 'mastermenu')
        .leftJoin('mappingmenureport.masterreport', 'masterreport')
        .leftJoin('mappingmenureport.mastersection', 'mastersection')
        .orderBy('mappingmenureport.menuname', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
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
          id: mappingmenureportid,
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
      await this.mappingMenuReportRepository
        .createQueryBuilder()
        .update(MappingMenuReport)
        .set({ isdelete: 'true' })
        .where('mappingmenureportid = :mappingmenureportid', {
          mappingmenureportid,
        })
        .execute();

      return `Data berhasil dihapus`;
    } catch (error) {
      throw error;
    }
  }
}
