import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterEESCompany } from './master-company.entity';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { MasterCompanyDto } from './dto/master-company.dto';

@Injectable()
export class MasterCompanyService {
  constructor(
    @InjectRepository(MasterEESCompany)
    private masterCompanyRepository: Repository<MasterEESCompany>,
  ) {}

  async getAllCompany(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<MasterCompanyDto>> {
    try {
      const query = this.masterCompanyRepository
        .createQueryBuilder('mastercompany')
        .orderBy('mastercompany.companyname', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }
}
