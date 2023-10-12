import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnershipStatus } from './master-ownership-status.entity';
import { Repository } from 'typeorm';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { OwnershipStatusDto } from './dto/master-ownership-status.dto';

@Injectable()
export class OwnershipStatusService {
  constructor(
    @InjectRepository(OwnershipStatus)
    private ownershipStatusRepository: Repository<OwnershipStatus>,
  ) {}

  async getAllOwnershipStatus(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<OwnershipStatusDto>> {
    try {
      const query = this.ownershipStatusRepository
        .createQueryBuilder('ownershipstatus')
        .orderBy('ownershipstatuscode', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }
}
