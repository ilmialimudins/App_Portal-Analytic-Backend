import { Injectable } from '@nestjs/common';
import { Cla } from './master-cla.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { ClaDto } from './dto/master-cla.dto';

@Injectable()
export class ClaService {
  constructor(
    @InjectRepository(Cla)
    private claRepository: Repository<Cla>,
  ) {}

  async getAllCla(pageOptions: PageOptionsDTO): Promise<PageDto<ClaDto>> {
    try {
      const query = this.claRepository
        .createQueryBuilder('cla')
        .orderBy('clacode', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }
}
