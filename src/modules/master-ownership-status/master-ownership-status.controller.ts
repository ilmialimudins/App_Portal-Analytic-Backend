import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { OwnershipStatusService } from './master-ownership-status.service';
import { OwnershipStatusDto } from './dto/master-ownership-status.dto';
import { PageOptionsDTO } from 'src/common/dto/page-options.dto';
import { PageDto } from 'src/common/dto/page.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Ownership Status')
@Controller('ownership-status')
export class OwnershipStatusController {
  constructor(private ownershipStatusService: OwnershipStatusService) {}

  @Get('/')
  @ApiCreatedResponse({ type: OwnershipStatusDto })
  async getOwnershipStatus(
    @Query() pageOptions: PageOptionsDTO,
  ): Promise<PageDto<OwnershipStatusDto>> {
    return this.ownershipStatusService.getAllOwnershipStatus(pageOptions);
  }
}
