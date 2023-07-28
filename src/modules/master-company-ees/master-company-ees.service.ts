import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterCompanyEES } from './master-company-ees.entity';
import { Repository } from 'typeorm';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { MasterCompanyEESDto } from './dto/master-company-ees.dto';
import { PageDto } from 'src/common/dto/page.dto';

@Injectable()
export class MasterCompanyEESService {
  constructor(
    @InjectRepository(MasterCompanyEES)
    private masterCompanyEESRepository: Repository<MasterCompanyEES>,
  ) {}

  async getAllCompany(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<MasterCompanyEESDto>> {
    try {
      const query = this.masterCompanyEESRepository
        .createQueryBuilder('mastercompanyees')
        .orderBy('mastercompanyees.companyeesname', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }

  async getAllCompanyName(
    pageOptions: PageOptionsDTO,
    name: string,
  ): Promise<PageDto<MasterCompanyEESDto>> {
    try {
      const query = this.masterCompanyEESRepository
        .createQueryBuilder('mastercompany')
        .where('mastercompany.companynameees = :name', { name })
        .orderBy('mastercompany.companynameees', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }
}
