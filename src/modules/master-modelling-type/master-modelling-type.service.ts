import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModellingType } from './master-modelling-type.entity';
import { Repository } from 'typeorm';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { ModellingTypeDto } from './dto/master-modelling-type.dto';

@Injectable()
export class ModellingTypeService {
  constructor(
    @InjectRepository(ModellingType)
    private modellingTypeRepository: Repository<ModellingType>,
  ) {}

  async getAllModellingType(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<ModellingTypeDto>> {
    try {
      const query = this.modellingTypeRepository
        .createQueryBuilder('modellingtype')
        .orderBy('modellingtypecode', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }
}
