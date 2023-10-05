import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectReview } from './master-direct-review.entity';
import { Repository } from 'typeorm';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { DirectReviewDto } from './dto/master-direct-review.dto';

@Injectable()
export class DirectReviewService {
  constructor(
    @InjectRepository(DirectReview)
    private directReviewRepository: Repository<DirectReview>,
  ) {}

  async getAllDirectReview(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDto<DirectReviewDto>> {
    try {
      const query = this.directReviewRepository
        .createQueryBuilder('directreview')
        .orderBy('directreviewdesc', pageOptions.order);

      const [items, pageMetaDto] = await query.paginate(pageOptions);

      return items.toPageDto(pageMetaDto);
    } catch (error) {
      throw error;
    }
  }
}
