import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { DirectReviewService } from './master-direct-review.service';
import { DirectReviewDto } from './dto/master-direct-review.dto';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Direct Review')
@Controller('direct-review')
export class DirectReviewController {
  constructor(private directReviewService: DirectReviewService) {}

  @Get('/')
  @ApiCreatedResponse({ type: DirectReviewDto })
  async getDirectReview(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<DirectReviewDto>> {
    return this.directReviewService.getAllDirectReview(pageOptions);
  }
}
