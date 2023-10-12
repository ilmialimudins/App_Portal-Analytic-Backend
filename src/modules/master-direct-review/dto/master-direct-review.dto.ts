import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { DirectReview } from '../master-direct-review.entity';

export class DirectReviewDto extends AbstractDto {
  @ApiProperty()
  directreviewid: number;

  @ApiProperty()
  directreviewcode: string;

  @ApiProperty()
  directreviewdesc: string;

  @ApiProperty()
  desc: string;

  constructor(directReviewEntity: DirectReview) {
    super(directReviewEntity, { exludeFields: true });
    this.directreviewid = directReviewEntity.directreviewid * 1;
    this.directreviewcode = directReviewEntity.directreviewcode;
    this.directreviewdesc = directReviewEntity.directreviewdesc;
    this.desc = directReviewEntity.desc;
  }
}
