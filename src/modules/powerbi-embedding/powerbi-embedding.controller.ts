import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserInfo } from 'src/decorators/use-info.decorator';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserInfoDTO } from '../duende-authentication/dto/userinfo.dto';
import { PowerbiEmbeddingService } from './powerbi-embedding.service';

@ApiBearerAuth()
@ApiTags('Power BI')
@Controller('powerbi-embedding')
@UseGuards(AuthGuard)
export class PowerbiEmbeddingController {
  constructor(
    private readonly powerbiEmbeddingService: PowerbiEmbeddingService,
  ) {}

  @Get('/')
  async loginToMicrosoft(
    @Query('workspaceid') workspaceid: string,
    @Query('reportid') reportid: string,
    @UserInfo() userInfo: UserInfoDTO,
  ) {
    return this.powerbiEmbeddingService.getPowerBIMetadata(
      workspaceid,
      reportid,
      userInfo,
    );
  }
}
